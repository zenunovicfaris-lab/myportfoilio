import ImageView from "/src/components/generic/ImageView.jsx";
/**
 * Optimizovana ImageView komponenta koja podržava LCP i CLS fix
 * @param {string} src - Putanja do slike
 * @param {string} alt - Alt tekst
 * @param {string} className - CSS klase
 * @param {object} style - Inline stilovi
 * @param {boolean} priority - Ako je true, učitava sliku odmah (za LCP)
 * @param {number|string} width - Širina slike (za CLS fix)
 * @param {number|string} height - Visina slike (za CLS fix)
 */
function AvatarView({
  src,
  alt = "",
  className = "",
  style = {},
  priority = false,
  width,
  height,
}) {
  // Ako nema slike, ne renderuj ništa da ne pravi prazan prostor bezveze
  if (!src) return null;

  return (
    <div className={`avatar-view ${className}`} style={style}>
      {src && (
        <ImageView
          src={src}
          alt={alt}
          className={`avatar-view-image-view`}
          // ✅ Šaljemo nove propove dalje u ImageView
          priority={priority}
          width={width}
          height={height}
        />
      )}
    </div>
  );
}

export default AvatarView;
