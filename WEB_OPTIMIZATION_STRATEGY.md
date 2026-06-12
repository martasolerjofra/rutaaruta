# Estratègia d'Optimització de Rendiment (PageSpeed) 🚀

Basat en l'anàlisi realitzat a [PageSpeed Insights](https://pagespeed.web.dev/analysis/https-rutaaruta-com/em8y0xkhz0?form_factor=desktop), he dissenyat una estratègia per portar el web a la franja verda (més de 90 punts en totes les categories).

## 1. Optimització del LCP (Largest Contentful Paint) 🖼️
L'imatge hero és el que més triga a carregar perquè s'està carregant com a `background-image` en el CSS.

*   **Canvi a `<img>` tag**: Substituir el fons CSS per una etiqueta `<img>` real a l'HTML.
*   **Fetch Priority**: Afegir l'atribut `fetchpriority="high"` a la imatge hero.
*   **Format d'última generació**: Assegurar-nos que totes les fotos són `.webp` o `.avif` (ja s'està fent en part).
*   **Dimensions fixes**: Afegir atributs `width` i `height` a totes les imatges per evitar el "salt" del contingut (CLS).

## 2. Reducció del Temps de Bloqueig (TBT) i Render ⚡
El web ha d'esperar que es descarreguin tipografies i icones abans de mostrar-se.

*   **Font-Display Swap**: Afegir `&display=swap` a les Google Fonts (ja hi és, però cal verificar-ho).
*   **Icones Crítiques**: FontAwesome és molt pesat. Substituir-ho per SVGs inline per a les icones més usades o carregar-lo de forma asíncrona.
*   **Preconnect**: Afegir `<link rel="preconnect">` per a Google Fonts i el CDN de FontAwesome.

## 3. Millora del CLS (Cumulative Layout Shift) 📏
Els elements que "salten" mentre carrega la pàgina penalitzen molt la puntuació.

*   **Reserva d'espai per Header/Footer**: El Header es carrega via JavaScript. Cal donar una altura mínima (`min-height`) al placeholder del header (`header-placeholder`) en el CSS perquè el contingut de sota no pugi i baixi durant la càrrega.
*   **Dimensions en imatges**: Totes les imatges del grid han de tenir `width` i `height` definits a l'HTML.

## 4. Millora de l'Accessibilitat i SEO 🔍
*   **Contrast de colors**: Revisar que el verd del logotip sobre fosc (o viceversa) tingui prou contrast per a persones amb visió reduïda.
*   **Etiquetes Alt**: Continuar assegurant que totes les imatges tinguin descripcions útils.
*   **Links descriptius**: Canviar els "Llegir més" per títols més descriptius com "Llegir guia de Romania".

## 5. Implementació Tècnica (Propera fase)
Si em dones el vistiplau, puc començar a aplicar aquests canvis fitxer per fitxer:
1.  **Fase 1**: Optimització d'imatges i dimensions (Index i Subpàgines).
2.  **Fase 2**: Optimització de la càrrega de recursos crítics (Fonts i Icones).
3.  **Fase 3**: Millores de layout shift (CSS i Placeholders).

---
**Vols que comencem per la Fase 1 (Imatges i CLS)?**
