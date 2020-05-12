enum ClassName {
  Dark = 'Theme_color_gpnDark',
  Default = 'Theme_color_gpnDefault',
  Display = 'Theme_color_gpnDisplay',
}

type Theme = {
  name: string;
  class: ClassName;
  color: string;
  default?: boolean;
};

export const getThemes = (): Theme[] => [
  { name: 'Default', class: ClassName.Default, color: '#fff' },
  { name: 'Dark', class: ClassName.Dark, color: '#22272B', default: true },
  { name: 'Display', class: ClassName.Display, color: '#002033' },
];
