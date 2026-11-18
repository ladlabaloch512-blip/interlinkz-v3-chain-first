/* Interlinkz animation layer. Desktop only. Everything rests visible:
   all effects use gsap.from, so with no GSAP or on mobile the page
   shows its final state exactly as built. */
(function(){
  if(!window.gsap) return;
  var mq = window.matchMedia('(min-width: 1024px)');
  if(!mq.matches) return;
  gsap.registerPlugin(ScrollTrigger);

  /* Draw SVG lines and paths on scroll into view */
  document.querySelectorAll('[data-draw]').forEach(function(el){
    var len = 1200;
    try{ len = el.getTotalLength(); }catch(e){}
    gsap.fromTo(el,
      {strokeDasharray: len, strokeDashoffset: len},
      {strokeDashoffset: 0, duration: 1.4, ease: 'power2.out',
       scrollTrigger: {trigger: el, start: 'top 88%', once: true}});
  });

  /* Nodes and links light in sequence, then a pulse travels across */
  document.querySelectorAll('[data-nodes]').forEach(function(group){
    var items = group.querySelectorAll('.pnode');
    if(!items.length) return;
    var tl = gsap.timeline({scrollTrigger: {trigger: group, start: 'top 88%', once: true}});
    tl.from(items, {scale: .4, opacity: 0, transformOrigin: 'center center',
                    duration: .45, ease: 'back.out(2.2)', stagger: .14})
      .to(items, {scale: 1.22, duration: .22, ease: 'power1.inOut',
                  stagger: {each: .16, yoyo: true, repeat: 1}}, '+=0.15');
  });

  /* Hero frame sequence: the browser visual builds itself.
     Sketch strokes, then wireframe, then the finished colour page. */
  var seq = document.querySelector('.seq-browser');
  if(seq){
    var tl = gsap.timeline({defaults: {ease: 'power2.out'}});
    tl.from('.seq-browser .f-sketch path, .seq-browser .f-sketch rect', {opacity: 0, duration: .5, stagger: .06})
      .from('.seq-browser .f-wire rect, .seq-browser .f-wire line, .seq-browser .f-wire circle', {opacity: 0, duration: .45, stagger: .045}, '-=0.1')
      .from('.seq-browser .f-final rect, .seq-browser .f-final circle, .seq-browser .f-final text', {opacity: 0, y: 6, duration: .5, stagger: .05}, '-=0.05')
      .from('.hero3 h1 .ci', {scale: 0, rotation: -30, duration: .5, ease: 'back.out(2)', stagger: .15}, '-=0.5');
  }

  /* Service cards linked: the joiners pop in one after another */
  document.querySelectorAll('[data-joins]').forEach(function(group){
    var joins = group.querySelectorAll('.join, .nl-join, .ring-join, .plan-join');
    if(!joins.length) return;
    gsap.from(joins, {scale: 0, opacity: 0, transformOrigin: 'center center',
      duration: .4, ease: 'back.out(2.4)', stagger: .16,
      scrollTrigger: {trigger: group, start: 'top 88%', once: true}});
  });
})();
