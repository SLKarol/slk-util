import Snoowrap from "snoowrap";

import { type SettingsReddit } from "@shared/lib/types/app-settings";
import { type MediaSummaryPreview } from "@shared/lib/types/media";

import { parseSubmissionInfo } from "./lib/helpers";

/**
 * Работа с Reddit
 */
export class Reddit {
  private client: Snoowrap | null = null;

  constructor(settings: SettingsReddit) {
    this.reConnect(settings);
  }

  /**
   * Подписки собираются с помощью метода getSubscriptions.
   * Если в результате выполнения запроса будет объект _query:{after:ID},
   * то необходимо снова выполнить getSubscriptions с параметром after:ID
   */
  mySubreddits = async () => {
    if (!this.client) return [];

    // Имя последней подписки в запросе
    let after: string | null = null;
    // Массив reddit-подписок
    const subArray: {
      id: string;
      url: string;
      title: string;
      over18: boolean;
    }[] = [];
    do {
      // eslint-disable-next-line no-await-in-loop
      const subs = await this.client.getSubscriptions(
        after !== null ? { after } : undefined,
      );
      subs.forEach((s) => {
        const { over18, title, url, id } = s;
        subArray.push({ over18, title, url, id });
      });
      const { _query: query } = subs as unknown as {
        _query: { after: string | null };
      };
      after = query.after;
    } while (after !== null);

    return subArray.map((s) => {
      const { over18, title, url } = s;
      return { id: url.replace("/r/", "").slice(0, -1), over18, title };
    });
  };

  /**
   * ПереПодключение к реддиту
   */
  reConnect(settings: SettingsReddit) {
    const { redditApiSecret, redditAppId, redditPassword, redditUserName } =
      settings;
    if (
      redditUserName.length &&
      redditApiSecret.length &&
      redditAppId.length &&
      redditPassword.length
    ) {
      const userAgent = `Node.js/16.14.2:snoowrap:v1.23.0 (by /u/${redditUserName})`;
      this.client = new Snoowrap({
        userAgent,
        clientId: redditAppId,
        clientSecret: redditApiSecret,
        username: redditUserName,
        password: redditPassword,
      });
    }
  }

  /**
   * Получить новые записи по подписке.
   * Картинки не запрашиваются.
   */
  getNewRecords = async (params: {
    channel: string;
    limit: number;
    after?: string;
    before?: string;
  }) => {
    if (!this.client) return { data: [], after: "", channel: "" };

    const { limit, channel, after, before } = params;
    const newSubbRecords = await this.client.getNew(channel, {
      limit,
      after: after || undefined,
      before: before || undefined,
      // Я уже не помню, что это за параметр
      count: 5,
    });
    const { _query } = newSubbRecords as unknown as {
      _query: { after: string | null };
    };

    const data = await Promise.allSettled(
      newSubbRecords.map(parseSubmissionInfo),
    ).then((records) => {
      return records.reduce((acc, record) => {
        if (record.status === "fulfilled") {
          const { value } = record as { value: MediaSummaryPreview };
          acc.push({ ...value });
        }

        return acc;
      }, [] as MediaSummaryPreview[]);
    });
    return { data, after: _query.after, channel };
  };
}
