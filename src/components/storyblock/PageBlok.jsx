import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

const PageBlok = ({ blok }) => (
  <main {...storyblokEditable(blok)}>
    {blok.body?.map((nestedBlok) => (
      <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
);

export default PageBlok;
