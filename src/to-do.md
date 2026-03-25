Запрос:
block=&login=skala&password=rs707

В заголовок запроса добавить:

Idempotency-Key: (см. алису) - для логина

Host: stihi.ru
// ! Они сами так дублируют
'Cookie': login=skala; pcode=2046478971; login=skala; pcode=2046478971; cookies_policy=true
// ! Добавь Referer

Чтобы интегрироваться с блоками, предлагаю сделать настройку сохранения списков тех, кто заблокирован.
Пока, по умолчанию, в каталоге shared.
Затем сделать загрузку в стор.
После чего сделать вкладки.

---

function extractCookies(headers) {
const setCookie = headers.get('set-cookie');
if (setCookie) {
// Разбираем все cookies из заголовка
const newCookies = Array.isArray(setCookie) ? setCookie : [setCookie];
cookies.push(...newCookies);
}
}

После:

headers: {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
'Content-Type': 'application/x-www-form-urlencoded',
'Cookie': cookies.join('; ')
},

туду
Если выбран раздел точно такой же, что и загруженный, то дизейбл кнопки
