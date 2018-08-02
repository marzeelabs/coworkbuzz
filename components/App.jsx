import BesugoComponent from 'Besugo';

import Previews from 'Previews';
import SVGElements from 'partials/SVGElements';
import TopHeader from 'partials/TopHeader';
import EndFooter from 'partials/EndFooter';
import SlideShow from 'partials/SlideShow';
import SocialIcons from 'partials/SocialIcons';
import MoreArrow from 'MoreArrow';
import SrcSet, { SrcSetBg } from 'SrcSet';

[
  Previews,
  SVGElements,
  TopHeader,
  EndFooter,
  SlideShow,
  SocialIcons,
  MoreArrow,
  SrcSet,
  SrcSetBg,
].forEach((Comp) => {
  Comp.initialize();
});

export default BesugoComponent.build();
