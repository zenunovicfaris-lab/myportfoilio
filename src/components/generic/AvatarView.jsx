import React from 'react'

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
function ImageView({ 
    src, 
    alt = "", 
    className = "", 
    style = {},
    priority = false, 
    width, 
    height 
}) {
    
    // Ako nema slike, ne renderuj ništa da ne pravi prazan prostor bezveze
    if (!src) return null;

    return (
        <img 
            src={src}
            alt={alt}
            className={className}
            style={style}
            // --- OPTIMIZACIJA ZA SEO I PERFORMANSE ---
            // 1. Rezervisanje prostora (CLS fix)
            width={width}   
            height={height} 
            // 2. Brzo učitavanje ako je prioritet (LCP fix)
            loading={priority ? "eager" : "lazy"} 
            fetchPriority={priority ? "high" : "auto"}
        />
    )
}

export default ImageView
