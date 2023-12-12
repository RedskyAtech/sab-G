import { trigger, transition, style, animate } from "@angular/animations";

export const slideInAnimation = trigger("routeAnimations", [
  transition(":enter", [
    style({ opacity: 0.5 }),
    animate("400ms", style({ opacity: 1 })),
  ]),
  // transition(":enter", [
  //   style({ opacity: 0.5, transform: "translateX(100)" }),
  //   animate("500ms", style({ opacity: 1, transform: "translateX(0)" })),
  // ]),
  // transition(":leave", [
  //   style({ opacity: 1, transform: "translateX(0)" }),
  //   animate("100ms", style({ opacity: 0, transform: "translateX(-100)" })),
  // ]),
]);
