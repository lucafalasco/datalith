import {
  Title,
  Subtitle,
  Description,
  ArgsTable,
  PRIMARY_STORY,
  Source,
} from '@storybook/addon-docs/blocks'

export const parameters = {
  options: {
    storySort: {
      order: ['INTRO', 'DATALITHS'],
    },
  },
  docs: {
    page: () => (
      <>
        <Title />
        <Subtitle />
        <Description />
        <Source dark={true} />
        <ArgsTable story={PRIMARY_STORY} />
      </>
    ),
  },
}
