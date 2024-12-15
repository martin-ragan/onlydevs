// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
import TabPanel from "$lib/tab-panel/TabPanel.svelte";
import Card from "$lib/card/Card.svelte";

export default {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {},
};


export const Primary = {
  args: {
    image: null,
    title: 'Úvod do webového vývoje',
    description: 'Za jeden semestr webovým vývojářem? Ano, v tomto předmětu se naučíte vše co v takovémto odvětví budete\n' +
        'potřebovat. Nejen, že si projdeme v rámci frontendu vše od HTML a CSS až po pokročilé věci v Reactu, ale také\n' +
        'se seznámíte s technologiemi na straně serveru, ukážeme si práci s databází a na konci toto vše budete zvládat propojovat do jedné aplikace a nasazovat na servery. Tak pojďme na to!\n',
    badges: ['React', 'HTML', 'CSS'],
    price: 199
  },
};


export const Secondary = {
  args: {
    image: 'https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp',
    title: 'Úvod do webového vývoje',
    description: 'Za jeden semestr webovým vývojářem? Ano, v tomto předmětu se naučíte vše co v takovémto odvětví budete\n' +
        'potřebovat. Nejen, že si projdeme v rámci frontendu vše od HTML a CSS až po pokročilé věci v Reactu, ale také\n' +
        'se seznámíte s technologiemi na straně serveru, ukážeme si práci s databází a na konci toto vše budete zvládat propojovat do jedné aplikace a nasazovat na servery. Tak pojďme na to!\n',
    badges: ['React', 'HTML', 'CSS'],
    price: 199,
    class: 'card--smaller'
  },
};
