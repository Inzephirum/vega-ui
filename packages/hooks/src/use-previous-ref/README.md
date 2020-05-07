# usePreviousRef

Данный хук необходим для кейсов, где нужно получить значение прошлого рендера у поля.

Возвращает ref, у которого в current хранится значение прошлого рендера

### API

```
value - аргумент, у которого нужно предыдущее значение
```

### Пример использования

```js
const foo = 'bar';
const previousFooRef = usePreviousRef(foo);
```