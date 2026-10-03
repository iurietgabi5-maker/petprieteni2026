import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { CheckCircle } from "@phosphor-icons/react/dist/csr/CheckCircle";
import { CreditCard } from "@phosphor-icons/react/dist/csr/CreditCard";
import { Heart } from "@phosphor-icons/react/dist/csr/Heart";
import { Headset } from "@phosphor-icons/react/dist/csr/Headset";
import { List } from "@phosphor-icons/react/dist/csr/List";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/csr/MagnifyingGlass";
import { Minus } from "@phosphor-icons/react/dist/csr/Minus";
import { Package } from "@phosphor-icons/react/dist/csr/Package";
import { PawPrint } from "@phosphor-icons/react/dist/csr/PawPrint";
import { Plus } from "@phosphor-icons/react/dist/csr/Plus";
import { ShieldCheck } from "@phosphor-icons/react/dist/csr/ShieldCheck";
import { ShoppingCart } from "@phosphor-icons/react/dist/csr/ShoppingCart";
import { Star } from "@phosphor-icons/react/dist/csr/Star";
import { Truck } from "@phosphor-icons/react/dist/csr/Truck";
import { UserCircle } from "@phosphor-icons/react/dist/csr/UserCircle";
import { X } from "@phosphor-icons/react/dist/csr/X";
import { products } from "./products.js";

const categories = [
  { name: "Câini", note: "Tot ce-i trebuie", image: "/assets/boxer-hero.webp", imageClass: "dog-tile" },
  { name: "Pisici", note: "Pentru mici exploratori", image: "/assets/category-cats.webp" },
  { name: "Hrană", note: "Rețete pentru fiecare", image: "/assets/category-food.webp" },
  { name: "Hăinuțe", note: "Confort în fiecare zi", image: "/assets/category-clothes.webp" },
  { name: "Jucării", note: "Distracție fără oprire", image: "/assets/category-toys.webp" },
];


const money = (value) =>
  `${value.toLocaleString("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} lei`;


function productPath(product) {
  return "/produse/" + product.id + "/";
}

function handleProductLinkClick(event, product, onOpenProduct) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onOpenProduct(product);
}

function ProductDetailPage({ product, relatedProducts, quantity, isFavorite, onQuantityChange, onAddToCart, onToggleFavorite, onHome, onCategory, onOpenProduct }) {
  return (
    <main className="product-detail-page">
      <div className="page-wrap">
        <nav className="product-breadcrumbs" aria-label="Fir de navigare">
          <button type="button" onClick={onHome}>Acasă</button>
          <ArrowRight size={14} aria-hidden="true" />
          <button type="button" onClick={() => onCategory(product.categories[0])}>{product.categories[0]}</button>
          <ArrowRight size={14} aria-hidden="true" />
          <span aria-current="page">{product.name}</span>
        </nav>

        <section className="product-detail-layout" aria-labelledby="product-detail-title">
          <div className="product-detail-media">
            {product.badge && <span className="product-badge">{product.badge}</span>}
            <img className={product.id === "knit-sweater" ? "photo-cover" : ""} src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-copy">
            <p className="eyebrow"><span className="eyebrow-dot" />{product.categories.join(" · ")}</p>
            <h1 id="product-detail-title">{product.name}</h1>
            <div className="detail-rating" aria-label={"Evaluare " + product.rating + " din 5, " + product.reviews + " recenzii"}>
              <span className="rating-stars" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={17} weight="fill" />)}</span>
              <strong>{product.rating}</strong>
              <span>({product.reviews} recenzii)</span>
            </div>
            <p className="detail-description">{product.description}</p>
            <p className="detail-variant">{product.details}</p>
            <div className="detail-price-row">
              <strong className="detail-price">{money(product.price)}</strong>
              <span>Preț cu TVA inclus</span>
            </div>
            <p className="detail-availability"><CheckCircle size={19} weight="fill" aria-hidden="true" /> Disponibil pentru comandă</p>

            <div className="detail-purchase-row">
              <div className="quantity-control" aria-label={"Cantitate pentru " + product.name}>
                <button type="button" onClick={() => onQuantityChange(product.id, -1)} aria-label="Scade cantitatea"><Minus size={17} weight="bold" /></button>
                <span aria-live="polite">{quantity}</span>
                <button type="button" onClick={() => onQuantityChange(product.id, 1)} aria-label="Mărește cantitatea"><Plus size={17} weight="bold" /></button>
              </div>
              <button className="primary-button detail-add-button" type="button" onClick={() => onAddToCart(product)}>
                <ShoppingCart size={21} aria-hidden="true" /> Adaugă în coș
              </button>
              <button className={isFavorite ? "detail-favorite is-saved" : "detail-favorite"} type="button" onClick={() => onToggleFavorite(product.id)} aria-pressed={isFavorite} aria-label={isFavorite ? "Șterge produsul din favorite" : "Adaugă produsul la favorite"}>
                <Heart size={21} weight={isFavorite ? "fill" : "regular"} aria-hidden="true" />
              </button>
            </div>

            <div className="detail-delivery-card">
              <Truck size={25} aria-hidden="true" />
              <span><strong>Livrare rapidă</strong><small>În 1–3 zile lucrătoare · transport gratuit de la 199 lei</small></span>
            </div>
          </div>
        </section>

        <section className="product-information" aria-label="Informații despre produs">
          <article className="product-info-card product-info-description">
            <p className="eyebrow">Pe scurt</p>
            <h2>Despre produs</h2>
            <p>{product.description}</p>
          </article>
          <article className="product-info-card">
            <p className="eyebrow">Lucruri bune</p>
            <h2>De ce îl vei îndrăgi</h2>
            <ul className="product-highlights">
              {product.highlights.map((highlight) => <li key={highlight}><CheckCircle size={18} weight="fill" aria-hidden="true" />{highlight}</li>)}
            </ul>
          </article>
          <article className="product-info-card">
            <p className="eyebrow">Detalii utile</p>
            <h2>Informații produs</h2>
            <dl className="product-specifications">
              {product.specifications.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
          </article>
        </section>

        {relatedProducts.length > 0 && <section className="related-products" aria-labelledby="related-products-title">
          <div className="section-heading">
            <div><p className="eyebrow">Poate îți mai place</p><h2 id="related-products-title">Produse asemănătoare</h2></div>
            <button className="text-link" type="button" onClick={onHome}>Vezi toate produsele <ArrowRight size={18} aria-hidden="true" /></button>
          </div>
          <div className="related-product-grid">
            {relatedProducts.map((related) => <article className="related-product-card" key={related.id}>
              <a href={productPath(related)} onClick={(event) => handleProductLinkClick(event, related, onOpenProduct)} aria-label={"Vezi " + related.name}>
                <img src={related.image} alt="" />
                <strong>{related.name}</strong>
              </a>
              <p>{money(related.price)}</p>
            </article>)}
          </div>
        </section>}
      </div>
    </main>
  );
}

function ProductNotFound({ onHome }) {
  return (
    <main className="product-not-found page-wrap">
      <PawPrint size={42} aria-hidden="true" />
      <h1>Nu am găsit acest produs</h1>
      <p>Înapoi la magazin și te ajutăm să găsești ce cauți.</p>
      <button className="primary-button" type="button" onClick={onHome}>Înapoi la magazin</button>
    </main>
  );
}

function scrollToProducts() {
  document.getElementById("produse")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function App() {
  const [pathname, setPathname] = useState(() => window.location.pathname);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [sortOrder, setSortOrder] = useState("recommended");
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("cart");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [placedOrder, setPlacedOrder] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState("curier");
  const [paymentMethod, setPaymentMethod] = useState("ramburs");

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryPrice = subtotal === 0 || subtotal >= 199 ? 0 : deliveryMethod === "locker" ? 9.9 : 14.9;
  const grandTotal = subtotal + deliveryPrice;

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ro-RO");
    const list = products.filter((product) => {
      const searchable = `${product.name} ${product.details} ${product.categories.join(" ")}`.toLocaleLowerCase("ro-RO");
      const matchesCategory = !activeCategory || product.categories.includes(activeCategory);
      const matchesSearch = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesFavorites = !showFavorites || favorites.includes(product.id);
      const isFeatured = Boolean(showAllProducts || activeCategory || normalizedQuery || showFavorites || product.id !== "knit-sweater");
      return matchesCategory && matchesSearch && matchesFavorites && isFeatured;
    });
    if (sortOrder === "price-low") return [...list].sort((a, b) => a.price - b.price);
    if (sortOrder === "price-high") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [activeCategory, favorites, query, showAllProducts, showFavorites, sortOrder]);

  const routeSegments = pathname.split("/").filter(Boolean);
  const productIdFromPath = routeSegments[0] === "produse" ? routeSegments[1] : undefined;
  const currentProduct = products.find((product) => product.id === productIdFromPath);
  const isProductRoute = pathname.startsWith("/produse/");

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    document.title = currentProduct ? currentProduct.name + " | PetPrieteni" : "PetPrieteni — pentru prieteni pe viață";
  }, [currentProduct]);

  function navigateHome() {
    if (window.location.pathname !== "/") window.history.pushState({}, "", "/");
    else window.history.replaceState({}, "", "/");
    setPathname("/");
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToCatalog() {
    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
      setPathname("/");
      window.setTimeout(scrollToProducts, 0);
    } else {
      scrollToProducts();
    }
  }

  function openProduct(product) {
    const nextPath = productPath(product);
    window.history.pushState({}, "", nextPath);
    setPathname(nextPath);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function selectCategory(category) {
    if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
      setPathname("/");
    }
    setActiveCategory(category);
    setShowAllProducts(true);
    setShowFavorites(false);
    setMobileMenuOpen(false);
    window.setTimeout(scrollToProducts, 0);
  }

  function clearFilters() {
    setActiveCategory("");
    setQuery("");
    setShowFavorites(false);
    setShowAllProducts(true);
  }

  function addToCart(product) {
    const quantity = quantities[product.id] || 1;
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...current, { ...product, quantity }];
    });
    setCheckoutStep("cart");
    setCartOpen(true);
  }

  function changeCartQuantity(id, amount) {
    setCart((current) => current
      .map((item) => item.id === id ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0));
  }

  function changeSelectedQuantity(id, amount) {
    setQuantities((current) => ({ ...current, [id]: Math.min(20, Math.max(1, (current[id] || 1) + amount)) }));
  }

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function placeOrder(event) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setPlacedOrder(cart);
    setOrderNumber(`PT-${Math.floor(10000 + Math.random() * 90000)}`);
    setCheckoutStep("success");
    setCart([]);
  }

  function closeCart() {
    setCartOpen(false);
    setCheckoutStep("cart");
  }

  const checkoutSubtotal = placedOrder.reduce((total, item) => total + item.price * item.quantity, 0);
  const checkoutDelivery = checkoutSubtotal === 0 || checkoutSubtotal >= 199 ? 0 : deliveryMethod === "locker" ? 9.9 : 14.9;

  return (
    <div className="site-shell">
      <div className="top-message">
        <span>Livrare rapidă în toată România</span>
        <span className="top-message-separator" aria-hidden="true">•</span>
        <span>Transport gratuit de la 199 lei</span>
      </div>

      <header className="site-header">
        <div className="header-main page-wrap">
          <a className="brand" href="/" aria-label="PetPrieteni, pagina principală" onClick={(event) => { event.preventDefault(); clearFilters(); navigateHome(); }}>
            <PawPrint className="brand-paw" weight="fill" aria-hidden="true" />
            <span className="brand-copy"><strong>PetPrieteni</strong><small>Tot ce-i mai bun pentru prietenii tăi</small></span>
          </a>

          <form className="search-form" role="search" onSubmit={(event) => { event.preventDefault(); goToCatalog(); }}>
            <MagnifyingGlass size={21} weight="regular" aria-hidden="true" />
            <label className="sr-only" htmlFor="site-search">Caută produse</label>
            <input id="site-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ce cauți pentru prietenul tău?" />
            <button className="search-submit" type="submit">Caută</button>
          </form>

          <div className="header-actions">
            <button className="header-link help-link" type="button" onClick={() => document.getElementById("ajutor")?.showModal()}>
              <Headset size={23} weight="regular" aria-hidden="true" /><span>Ai nevoie<br />de ajutor?</span>
            </button>
            <button className="header-link account-link" type="button" onClick={() => document.getElementById("cont")?.showModal()}>
              <UserCircle size={23} weight="regular" aria-hidden="true" /><span>Contul meu</span>
            </button>
            <button className="cart-button" type="button" onClick={() => { setCheckoutStep("cart"); setCartOpen(true); }} aria-label={`Deschide coșul, ${cartCount} produse`}>
              <ShoppingCart size={23} weight="regular" aria-hidden="true" />
              <span>Coșul meu</span><span className="cart-count" aria-live="polite">{cartCount}</span>
            </button>
          </div>

          <button className="mobile-menu-toggle" type="button" aria-label={mobileMenuOpen ? "Închide meniul" : "Deschide meniul"} aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}>
            {mobileMenuOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>

        <nav className={`main-nav ${mobileMenuOpen ? "is-open" : ""}`} aria-label="Categorii principale">
          <div className="page-wrap nav-inner">
            {["Câini", "Pisici", "Hrană", "Hăinuțe", "Jucării", "Recompense"].map((category) => (
              <button key={category} className={activeCategory === category ? "nav-item is-active" : "nav-item"} type="button" onClick={() => selectCategory(category)}>{category}</button>
            ))}
            <a className="nav-quiet" href="#despre">Despre noi</a>
            <a className="nav-quiet" href="#livrare">Livrare și plată</a>
            <a className="nav-quiet" href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      {currentProduct ? <ProductDetailPage product={currentProduct} relatedProducts={products.filter((product) => product.id !== currentProduct.id && product.categories.some((category) => currentProduct.categories.includes(category))).slice(0, 3)} quantity={quantities[currentProduct.id] || 1} isFavorite={favorites.includes(currentProduct.id)} onQuantityChange={changeSelectedQuantity} onAddToCart={addToCart} onToggleFavorite={toggleFavorite} onHome={() => { clearFilters(); navigateHome(); }} onCategory={selectCategory} onOpenProduct={openProduct} /> : isProductRoute ? <ProductNotFound onHome={() => { clearFilters(); navigateHome(); }} /> : <main id="acasa">
        <section className="hero page-wrap" aria-labelledby="hero-title">
          <img className="hero-photo" src="/assets/boxer-hero.webp" alt="Boxer fericit, așezat într-o cameră luminoasă" />
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" />Bucurie pentru fiecare zi</p>
            <h1 id="hero-title">Bine ai venit la <span>PetPrieteni!</span></h1>
            <h2>Găsești ușor tot ce-i trebuie</h2>
            <p className="hero-description">Hrană, jucării, hăinuțe și îngrijire pentru o viață mai fericită, zi de zi.</p>
            <button className="primary-button hero-cta" type="button" onClick={() => { clearFilters(); scrollToProducts(); }}>
              Începe cumpărăturile <ArrowRight size={20} weight="bold" aria-hidden="true" />
            </button>
            <div className="hero-reassurance">
              <span><CheckCircle size={17} weight="fill" aria-hidden="true" /> Produse alese cu grijă</span>
              <span><CheckCircle size={17} weight="fill" aria-hidden="true" /> Prieteni fericiți</span>
            </div>
          </div>
          <div className="hero-photo-credit"><PawPrint size={15} weight="fill" aria-hidden="true" /> Pentru prieteni pe viață</div>
        </section>

        <section className="categories-section page-wrap" aria-labelledby="categories-title">
          <div className="section-heading category-heading">
            <div><p className="eyebrow">Alege simplu</p><h2 id="categories-title">Cumpără pe categorii</h2></div>
            <button className="text-link" type="button" onClick={clearFilters}>Vezi toate produsele <ArrowRight size={18} aria-hidden="true" /></button>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <button className={`category-tile ${activeCategory === category.name ? "is-active" : ""}`} key={category.name} type="button" onClick={() => selectCategory(category.name)}>
                <img className={category.imageClass || ""} src={category.image} alt="" />
                <span className="category-shade" aria-hidden="true" />
                <span className="category-label"><strong>{category.name}</strong><small>{category.note}</small></span>
                <span className="category-arrow" aria-hidden="true"><ArrowRight size={18} weight="bold" /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="benefits-strip page-wrap" id="livrare" aria-label="Avantaje la cumpărături">
          <div className="benefit"><Truck size={32} weight="regular" aria-hidden="true" /><span><strong>Livrare rapidă</strong><small>În 1–3 zile lucrătoare</small></span></div>
          <div className="benefit"><CreditCard size={31} weight="regular" aria-hidden="true" /><span><strong>Plată în siguranță</strong><small>Cu cardul sau ramburs</small></span></div>
          <div className="benefit"><Package size={31} weight="regular" aria-hidden="true" /><span><strong>Retur simplu</strong><small>Fără bătăi de cap</small></span></div>
          <div className="benefit"><Heart size={32} weight="regular" aria-hidden="true" /><span><strong>Pentru prieteni fericiți</strong><small>Zi de zi</small></span></div>
        </section>

        <section className="products-section page-wrap" id="produse" aria-labelledby="products-title">
          <div className="section-heading products-heading">
            <div>
              <p className="eyebrow">Alese cu grijă pentru ei</p>
              <h2 id="products-title">{showFavorites ? "Produsele tale preferate" : activeCategory ? `Produse: ${activeCategory}` : showAllProducts ? "Toate produsele" : "Cele mai îndrăgite produse"}</h2>
            </div>
            <div className="catalog-tools">
              <button className={showFavorites ? "favorite-filter is-active" : "favorite-filter"} type="button" onClick={() => { setShowFavorites((current) => !current); setActiveCategory(""); }} aria-pressed={showFavorites}>
                <Heart size={19} weight={showFavorites ? "fill" : "regular"} aria-hidden="true" /> Favorite
              </button>
              <label className="sort-control"><span>Sortează</span>
                <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)} aria-label="Sortează produsele">
                  <option value="recommended">Recomandate</option><option value="price-low">Preț: mic la mare</option><option value="price-high">Preț: mare la mic</option>
                </select>
              </label>
            </div>
          </div>

          {(activeCategory || query || showFavorites) && <div className="filter-summary"><span>{visibleProducts.length} {visibleProducts.length === 1 ? "produs găsit" : "produse găsite"}</span><button type="button" onClick={clearFilters}>Șterge filtrele</button></div>}

          {visibleProducts.length ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-photo-wrap">
                    {product.badge && <span className="product-badge">{product.badge}</span>}
                    <button className={`save-product ${favorites.includes(product.id) ? "is-saved" : ""}`} type="button" onClick={() => toggleFavorite(product.id)} aria-label={favorites.includes(product.id) ? `Șterge ${product.name} din favorite` : `Adaugă ${product.name} la favorite`}>
                      <Heart size={21} weight={favorites.includes(product.id) ? "fill" : "regular"} aria-hidden="true" />
                    </button>
                    <a className="product-image-link" href={productPath(product)} onClick={(event) => handleProductLinkClick(event, product, openProduct)} aria-label={"Vezi " + product.name}>
                      <img className={product.id === "knit-sweater" ? "photo-cover" : ""} src={product.image} alt="" />
                    </a>
                  </div>
                  <div className="product-content">
                    <p className="product-category">{product.categories[0]}</p>
                    <h3><a className="product-name-link" href={productPath(product)} onClick={(event) => handleProductLinkClick(event, product, openProduct)}>{product.name}</a></h3>
                    <button className="product-detail-link" type="button" onClick={() => openProduct(product)}>Vezi detalii <ArrowRight size={15} aria-hidden="true" /></button>
                    <p className="product-details">{product.details}</p>
                    <div className="rating-row" aria-label={`Evaluare ${product.rating} din 5, ${product.reviews} recenzii`}><span className="rating-stars" aria-hidden="true">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={15} weight="fill" />)}</span><small>{product.rating} · {product.reviews} recenzii</small></div>
                    <strong className="product-price">{money(product.price)}</strong>
                    <div className="purchase-row">
                      <div className="quantity-control" aria-label={`Cantitate selectată pentru ${product.name}`}>
                        <button type="button" onClick={() => changeSelectedQuantity(product.id, -1)} aria-label="Scade cantitatea"><Minus size={16} weight="bold" /></button>
                        <span aria-live="polite">{quantities[product.id] || 1}</span>
                        <button type="button" onClick={() => changeSelectedQuantity(product.id, 1)} aria-label="Mărește cantitatea"><Plus size={16} weight="bold" /></button>
                      </div>
                      <span className="quantity-hint">buc.</span>
                    </div>
                    <button className="add-button" type="button" onClick={() => addToCart(product)}><ShoppingCart size={19} weight="regular" aria-hidden="true" /> Adaugă în coș</button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-results"><PawPrint size={34} weight="regular" aria-hidden="true" /><h3>Nu am găsit produse potrivite</h3><p>Încearcă altă căutare sau vezi toate produsele.</p><button className="primary-button" type="button" onClick={clearFilters}>Vezi toate produsele</button></div>
          )}
        </section>

        <section className="comfort-banner page-wrap" id="despre">
          <img src="/assets/cat-comfort.webp" alt="Pisică adormită, relaxată pe o pătură moale" />
          <div className="comfort-copy"><p className="eyebrow">Grijă în fiecare zi</p><h2>Tot pentru confortul și fericirea lor</h2><p>De la hrana potrivită la jucăriile preferate, găsești aici lucruri bune pentru companionul tău.</p><button className="primary-button" type="button" onClick={scrollToProducts}>Descoperă produsele <ArrowRight size={18} aria-hidden="true" /></button></div>
          <div className="comfort-note"><Heart size={30} weight="regular" aria-hidden="true" /><span>Prietenie<br />în fiecare zi</span></div>
        </section>
      </main>}

      <footer className="site-footer page-wrap" id="contact">
        <a className="brand footer-brand" href="/" onClick={(event) => { event.preventDefault(); clearFilters(); navigateHome(); }}><PawPrint className="brand-paw" weight="fill" aria-hidden="true" /><span className="brand-copy"><strong>PetPrieteni</strong><small>Tot ce-i mai bun pentru prietenii tăi</small></span></a>
        <p>Lucruri alese cu grijă pentru o viață mai fericită împreună.</p>
        <span>© 2026 PetPrieteni · Magazin demonstrativ</span>
      </footer>

      <dialog className="info-dialog" id="ajutor">
        <button className="dialog-close" type="button" aria-label="Închide" onClick={() => document.getElementById("ajutor")?.close()}><X size={22} /></button>
        <Headset size={34} weight="regular" aria-hidden="true" /><p className="eyebrow">Suntem aici să te ajutăm</p><h2>Alegem împreună ce i se potrivește</h2><p>Folosește căutarea de sus sau alege o categorie. Așa găsești ușor produsele potrivite pentru companionul tău.</p><button className="primary-button" type="button" onClick={() => document.getElementById("ajutor")?.close()}>Am înțeles</button>
      </dialog>
      <dialog className="info-dialog" id="cont">
        <button className="dialog-close" type="button" aria-label="Închide" onClick={() => document.getElementById("cont")?.close()}><X size={22} /></button>
        <UserCircle size={34} weight="regular" aria-hidden="true" /><p className="eyebrow">Bine ai venit</p><h2>Contul tău, pe scurt</h2><p>Într-un magazin real, aici ai putea urmări comenzile și salva adresele preferate. Acest prototip nu colectează date personale.</p><button className="primary-button" type="button" onClick={() => document.getElementById("cont")?.close()}>Continuă cumpărăturile</button>
      </dialog>

      {cartOpen && <div className="drawer-layer">
        <button className="drawer-backdrop" type="button" aria-label="Închide coșul" onClick={closeCart} />
        <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="drawer-title">
          <div className="drawer-header"><div><p className="eyebrow">PetPrieteni</p><h2 id="drawer-title">{checkoutStep === "cart" ? "Coșul meu" : checkoutStep === "checkout" ? "Finalizare comandă" : "Comandă plasată"}</h2></div><button className="dialog-close" type="button" onClick={closeCart} aria-label="Închide coșul"><X size={23} /></button></div>

          {checkoutStep === "cart" && <>
            {cart.length === 0 ? <div className="cart-empty"><ShoppingCart size={38} weight="regular" aria-hidden="true" /><h3>Coșul tău este gol</h3><p>Alege produsele potrivite pentru prietenul tău.</p><button className="primary-button" type="button" onClick={closeCart}>Vezi produsele</button></div> : <>
              <div className="free-shipping-note">{subtotal >= 199 ? <><CheckCircle size={18} weight="fill" /> Ai transport gratuit la această comandă.</> : <>Mai adaugă {money(199 - subtotal)} pentru transport gratuit.</>}</div>
              <div className="cart-items">{cart.map((item) => <article className="cart-item" key={item.id}>
                <img src={item.image} alt="" /><div className="cart-item-info"><h3>{item.name}</h3><p>{money(item.price)}</p><div className="cart-quantity"><button type="button" aria-label="Scade o bucată" onClick={() => changeCartQuantity(item.id, -1)}><Minus size={15} /></button><span>{item.quantity}</span><button type="button" aria-label="Adaugă o bucată" onClick={() => changeCartQuantity(item.id, 1)}><Plus size={15} /></button></div></div>
                <strong>{money(item.price * item.quantity)}</strong>
              </article>)}</div>
              <div className="cart-summary"><p><span>Subtotal</span><strong>{money(subtotal)}</strong></p><p><span>Livrare</span><strong>{deliveryPrice ? money(deliveryPrice) : "Gratuită"}</strong></p><p className="summary-total"><span>Total</span><strong>{money(grandTotal)}</strong></p></div>
              <button className="primary-button checkout-button" type="button" onClick={() => setCheckoutStep("checkout")}>Continuă la livrare <ArrowRight size={19} aria-hidden="true" /></button>
              <p className="secure-note"><ShieldCheck size={16} aria-hidden="true" /> Plată sigură · Ramburs sau card</p>
            </>}
          </>}

          {checkoutStep === "checkout" && <form className="checkout-form" onSubmit={placeOrder}>
            <div className="checkout-steps"><span className="step-active"><b>1</b> Livrare</span><span><b>2</b> Plată</span><span><b>3</b> Confirmare</span></div>
            <h3>Datele tale</h3><p className="form-intro">Completează datele pentru livrare.</p>
            <label>Nume și prenume<input name="name" autoComplete="name" required placeholder="Ex.: Ana Popescu" /></label>
            <div className="form-row"><label>Telefon<input name="tel" autoComplete="tel" inputMode="tel" required placeholder="07xx xxx xxx" pattern="[+0-9 ()-]{8,}" /></label><label>Email<input name="email" type="email" autoComplete="email" required placeholder="ana@email.ro" /></label></div>
            <label>Adresă<input name="address" autoComplete="street-address" required placeholder="Stradă, număr, bloc, apartament" /></label>
            <div className="form-row"><label>Oraș<input name="city" autoComplete="address-level2" required placeholder="Oraș" /></label><label>Județ<input name="county" autoComplete="address-level1" required placeholder="Județ" /></label></div>
            <fieldset><legend>Cum dorești să primești coletul?</legend>
              <label className="choice-row"><input type="radio" name="delivery" value="curier" checked={deliveryMethod === "curier"} onChange={() => setDeliveryMethod("curier")} /><span><strong>Curier, la adresă</strong><small>1–3 zile lucrătoare · {subtotal >= 199 ? "gratuit" : "14,90 lei"}</small></span></label>
              <label className="choice-row"><input type="radio" name="delivery" value="locker" checked={deliveryMethod === "locker"} onChange={() => setDeliveryMethod("locker")} /><span><strong>Ridicare de la locker</strong><small>Ridici când îți este comod · {subtotal >= 199 ? "gratuit" : "9,90 lei"}</small></span></label>
            </fieldset>
            <fieldset><legend>Metoda de plată</legend>
              <label className="choice-row"><input type="radio" name="payment" value="ramburs" checked={paymentMethod === "ramburs"} onChange={() => setPaymentMethod("ramburs")} /><span><strong>Plată ramburs</strong><small>Plătești la primirea coletului</small></span></label>
              <label className="choice-row"><input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} /><span><strong>Card online</strong><small>Simulare de prototip, fără procesare de plată</small></span></label>
            </fieldset>
            <div className="checkout-total"><span>Total de plată</span><strong>{money(subtotal + (subtotal >= 199 ? 0 : deliveryMethod === "locker" ? 9.9 : 14.9))}</strong></div>
            <button className="primary-button checkout-button" type="submit">Confirmă comanda <ArrowRight size={19} aria-hidden="true" /></button>
            <button className="back-to-cart" type="button" onClick={() => setCheckoutStep("cart")}>Înapoi la coș</button>
            <p className="secure-note"><ShieldCheck size={16} aria-hidden="true" /> Datele rămân în acest prototip și nu sunt trimise nicăieri.</p>
          </form>}

          {checkoutStep === "success" && <div className="order-success"><CheckCircle size={48} weight="fill" aria-hidden="true" /><p className="eyebrow">Mulțumim pentru comandă</p><h3>Totul este pregătit!</h3><p>Numărul comenzii tale demo este <strong>{orderNumber}</strong>. Într-un magazin real, ai primi confirmarea pe email.</p><div className="success-summary">{placedOrder.map((item) => <p key={item.id}><span>{item.quantity} × {item.name}</span><strong>{money(item.price * item.quantity)}</strong></p>)}<p className="summary-total"><span>Total</span><strong>{money(checkoutSubtotal + checkoutDelivery)}</strong></p></div><button className="primary-button" type="button" onClick={closeCart}>Înapoi la magazin</button></div>}
        </aside>
      </div>}
    </div>
  );
}

export { App };
