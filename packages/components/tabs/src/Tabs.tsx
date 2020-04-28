import React from 'react';

import './styles.css';

export const Tabs = () => {
  return (
    <div>
      <button type="button">«</button>
      <div>
        <ul>
          <li>
            <a href="s">О проекте</a>
          </li>
          <li>
            <a href="s">Пайплайн</a>
          </li>
          <li>
            <a href="s">Ресурсная база</a>
          </li>
          <li>
            <a href="s">Геологические риски</a>
          </li>
          <li>
            <a href="s">Профиль добычи</a>
          </li>
          <li>
            <a href="s">Оценка обустройства</a>
          </li>
          <li>
            <a href="s">Экономика проекта</a>
          </li>
          <li>
            <a href="s">Логика проекта</a>
          </li>
          <li>
            <a href="s">Моделирование</a>
          </li>
        </ul>
      </div>
      <button type="button">»</button>
    </div>
  );
};
