import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // Import Tippy.js styles

// Common Tooltip component with animation support
const Tooltip = ({ content, children, placement = 'top', animation = 'fade', duration = 250,
   theme,
   className,
   ...props }) => {
  return (
    <Tippy
      content={content}
      placement={placement || "bottom"}
      animation={animation || "fade"} // Use built-in "fade" for smoothness
      duration={ [300, 200]} // Specify open/close durations
      inertia={true} // Adds spring-like behavior
      delay={[100, 50]} // Adds slight delay for natural feel
      popperOptions={{
    modifiers: [
      {
        name: "applyStyle",
        enabled: true,
        fn: ({ state }) => {
          const tooltip = state.elements.popper;
          if (tooltip) {
            tooltip.style.animation =
              state.modifiersData.hide.offsets === "hidden"
                ? "smoothFadeOut 300ms ease-in-out"
                : "smoothFadeIn 300ms ease-in-out";
          }
        },
      },
    ],
  }}

      theme={theme}
      {...props}
      className={theme === 'dark' ?  "bg-white text-black rounded-md shadow-lg" : "bg-black text-white rounded-sm shadow-lg"}
      // className={className}
    >
      {children}
    </Tippy>
  );
};

export default Tooltip;
