import "./AvatarView.scss"
import React from 'react'
import ImageView from "/src/components/generic/ImageView.jsx"

// ✅ Dodali smo 'priority', 'width' i 'height' u props
function AvatarView({ 
    src = "", 
    alt = "", 
    faIcon = "", 
    className = "",  
    id = null, 
    style = null,
    priority = false, // ✅ NOVO
    width = undefined, // ✅ NOVO
    height = undefined // ✅ NOVO
}) {
    return (
        <div className={`avatar-view ${className}`}
             id={id}
             style={style}>
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

            {!src && (
                <div className={`avatar-icon-view`}>
                    <i className={`${faIcon}`}/>
                </div>
            )}
        </div>
    )
}

export default AvatarView
