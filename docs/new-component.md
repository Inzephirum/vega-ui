# Добавление нового компонента

Порядок шаблонных действий для создания нового компонента

...

## Статус и автор

При добавлении нового компонента необходимо указать его автора (к кому можно обратиться с вопросами по этому компоненту?) и его статус.

![pic-1](static/new-component/pic-1.png)

Статусы: Draft, Approved, Deprecated
Автор: Имя Фамилия | Компания

```jsx
import { Status } from '../../../../.storybook/with-metadata';

...

storiesOf('ui/Avatar', module)
  .addDecorator(withKnobs)
  .addParameters({ metadata: { author: 'Maksim Kononov | CSSSR', status: Status.Approved } })
  .add('Avatar', () => <Avatar {...defaultKnobs()} />);
```
