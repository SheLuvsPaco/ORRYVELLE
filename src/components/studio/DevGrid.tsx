/**
 * Local preview only: the phone layout grid (4 columns, 16px margins and gutters, 8px baseline)
 * drawn over the page, for checking alignment on a real phone. Turn it on with ?grid in the URL
 * (it stays on while you browse) or the Grid button; ?grid=off turns it off. Production builds
 * render nothing here, so it never reaches the live site or adds any JavaScript.
 */
export default function DevGrid() {
  if (process.env.NODE_ENV !== "development") return null;
  return (
    <>
      <style>{`
        .dev-grid, .dev-grid-toggle { display: none; }
        @media (max-width: 760px) {
          .dev-grid-toggle { display: block; position: fixed; left: 8px; bottom: 8px; z-index: 2147483647; padding: 6px 8px; border: 1px solid #c2185b; background: rgba(255,255,255,.9); color: #c2185b; font: 600 11px/1 system-ui, sans-serif; }
          html.show-grid .dev-grid { position: fixed; inset: 0; z-index: 2147483646; pointer-events: none; display: grid; grid-template-columns: repeat(4, 1fr); column-gap: 16px; padding: 0 16px;
            background-image: repeating-linear-gradient(to bottom, rgba(0, 110, 255, .14) 0 1px, transparent 1px 8px); }
          html.show-grid .dev-grid span { background: rgba(255, 0, 90, .07); border-inline: 1px solid rgba(255, 0, 90, .35); }
        }
      `}</style>
      <div className="dev-grid" aria-hidden="true"><span /><span /><span /><span /></div>
      <button type="button" className="dev-grid-toggle" id="dev-grid-toggle">Grid</button>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){var k='dev-grid',p=new URLSearchParams(location.search).get('grid');
if(p!==null)sessionStorage.setItem(k,p==='off'?'0':'1');
var on=sessionStorage.getItem(k)==='1',r=document.documentElement;r.classList.toggle('show-grid',on);
document.getElementById('dev-grid-toggle').addEventListener('click',function(){on=!on;sessionStorage.setItem(k,on?'1':'0');r.classList.toggle('show-grid',on);});})();`,
        }}
      />
    </>
  );
}
