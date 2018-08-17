import BesugoComponent from 'Besugo';

import Previews from 'Previews';
import SVGElements from 'partials/SVGElements';
import TopHeader from 'partials/TopHeader';
import EndFooter from 'partials/EndFooter';
import SlideShow from 'partials/SlideShow';
import SocialIcons from 'partials/SocialIcons';
import MoreArrow from 'MoreArrow';
import SrcSet, { SrcSetBg } from 'SrcSet';

import Intro from 'homepage/Intro';
import About from 'homepage/About';
import Register from 'homepage/Register';
import ScheduleDay from 'homepage/ScheduleDay';
import Partners from 'homepage/Partners';

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

  Intro,
  About,
  Register,
  ScheduleDay,
  Partners,
].forEach((Comp) => {
  Comp.initialize();
});

export default BesugoComponent.build();
