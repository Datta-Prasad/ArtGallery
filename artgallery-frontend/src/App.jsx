
import { useEffect, useState } from "react";
import { Palette, Plus, Search, MapPin, IndianRupee, Pencil, Trash2, X, Building2 } from "lucide-react";
import "./App.css";

const API = "http://localhost:8080/api/galleries";
const emptyForm = { galleryName: "", city: "", artStyle: "", entryFee: "" };

export default function App() {
  const [galleries, setGalleries] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadGalleries() {
    setLoading(true);
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Unable to load galleries");
      setGalleries(await res.json());
      setError("");
    } catch {
      setError("Cannot connect to backend. Start Spring Boot on port 8080.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadGalleries();
  }, []);

  function updateForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submitForm(e) {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      galleryName: form.galleryName.trim(),
      city: form.city.trim(),
      artStyle: form.artStyle.trim(),
      entryFee: Number(form.entryFee)
    };

    try {
      const res = await fetch(
        editingId !== null ? `${API}/${editingId}` : API,
        {
          method: editingId !== null ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (!res.ok) throw new Error("Unable to save gallery");

      setForm(emptyForm);
      setEditingId(null);
      await loadGalleries();
    } catch (err) {
      setError(err.message);
    }
  }

  function editGallery(gallery) {
    setEditingId(gallery.id);
    setForm({
      galleryName: gallery.galleryName || "",
      city: gallery.city || "",
      artStyle: gallery.artStyle || "",
      entryFee: String(gallery.entryFee ?? "")
    });
    document.getElementById("gallery-form")?.scrollIntoView({ behavior: "smooth" });
  }

  async function deleteGallery(gallery) {
    if (!window.confirm(`Delete ${gallery.galleryName}?`)) return;

    try {
      const res = await fetch(`${API}/${gallery.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Unable to delete gallery");
      await loadGalleries();
      if (editingId === gallery.id) {
        setEditingId(null);
        setForm(emptyForm);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  const filtered = galleries.filter(g =>
    [g.galleryName, g.city, g.artStyle].some(v =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  );

  const averageFee = galleries.length
    ? galleries.reduce((sum, g) => sum + Number(g.entryFee || 0), 0) / galleries.length
    : 0;

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><Palette size={27} /><div><b>ARTISTRY</b><small>GALLERY MANAGER</small></div></div>
        <p className="side-label">WORKSPACE</p>
        <a className="nav-link active" href="#galleries"><Building2 size={18} /> Galleries</a>
        <a className="nav-link" href="#gallery-form"><Plus size={18} /> Add a gallery</a>
        <div className="sidebar-bottom">
          <div className="mini-art"><span /><i /><b /></div>
          <h3>Art brings spaces to life.</h3>
          <p>Keep your creative world organized.</p>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <span>Workspace / Galleries</span>
          <button className="refresh" onClick={loadGalleries}>↻ Refresh</button>
        </header>

        <section className="hero">
          <div>
            <span className="eyebrow">YOUR CREATIVE SPACE</span>
            <h1>Every gallery,<br /><em>beautifully organized.</em></h1>
            <p>Discover places that celebrate art, culture and creativity.</p>
            <a href="#gallery-form" className="primary"><Plus size={17} /> Add a gallery</a>
          </div>
          <div className="hero-art">
            <div className="sun" /><div className="arch arch-one" /><div className="arch arch-two" /><div className="orb" />
            <span>FORM · COLOUR · SPACE</span>
          </div>
        </section>

        <section className="stats">
          <div className="stat"><div className="stat-icon peach"><Building2 /></div><span>TOTAL GALLERIES</span><strong>{galleries.length}</strong><small>In your collection</small></div>
          <div className="stat"><div className="stat-icon green"><Palette /></div><span>ART STYLES</span><strong>{new Set(galleries.map(g => g.artStyle)).size}</strong><small>Creative expressions</small></div>
          <div className="stat"><div className="stat-icon yellow"><IndianRupee /></div><span>AVERAGE ENTRY FEE</span><strong>₹{averageFee.toLocaleString("en-IN", { maximumFractionDigits: 2 })}</strong><small>Across all galleries</small></div>
        </section>

        <section className="form-panel" id="gallery-form">
          <span className="eyebrow">GALLERY DETAILS</span>
          <h2>{editingId !== null ? "Edit your gallery" : "Add a new gallery"}</h2>
          <p className="muted">Fill in the details to keep your collection up to date.</p>

          <form className="gallery-form" onSubmit={submitForm}>
            <label>Gallery name
              <input name="galleryName" value={form.galleryName} onChange={updateForm} placeholder="e.g. The Modern House" required />
            </label>
            <label>City
              <input name="city" value={form.city} onChange={updateForm} placeholder="e.g. Hyderabad" required />
            </label>
            <label>Art style
              <input name="artStyle" value={form.artStyle} onChange={updateForm} placeholder="e.g. Contemporary" required />
            </label>
            <label>Entry fee (₹)
              <input name="entryFee" type="number" min="0" step="0.01" value={form.entryFee} onChange={updateForm} placeholder="250" required />
            </label>
            <button className="primary submit" type="submit"><Plus size={17} /> {editingId !== null ? "Save changes" : "Add gallery"}</button>
            {editingId !== null && <button type="button" className="cancel" onClick={() => { setEditingId(null); setForm(emptyForm); }}><X size={16} /> Cancel</button>}
          </form>
        </section>

        {error && <div className="error">{error}</div>}

        <section className="collection" id="galleries">
          <div className="collection-heading">
            <div><span className="eyebrow">THE COLLECTION</span><h2>Explore galleries <span className="count">{filtered.length}</span></h2></div>
            <div className="search"><Search size={18} /><input placeholder="Search galleries..." value={search} onChange={e => setSearch(e.target.value)} /></div>
          </div>

          {loading ? <p className="empty">Loading galleries...</p> :
            filtered.length === 0 ? <div className="empty"><Palette size={30} /><h3>No galleries found</h3><p>Add a gallery or try another search.</p></div> :
            <div className="gallery-grid">
              {filtered.map((g, i) => (
                <article className="gallery-card" key={g.id}>
                  <div className={`gallery-art art-${i % 4}`}>
                    <span className="art-number">{String(i + 1).padStart(2, "0")}</span>
                    <div className="shape shape-a" /><div className="shape shape-b" /><div className="shape shape-c" />
                    <span className="style-tag">{g.artStyle}</span>
                  </div>
                  <div className="card-body">
                    <h3>{g.galleryName}</h3>
                    <p className="city"><MapPin size={14} /> {g.city}</p>
                    <div className="card-footer">
                      <div><small>ENTRY FEE</small><strong>₹{Number(g.entryFee || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</strong></div>
                      <div className="actions">
                        <button title="Edit" onClick={() => editGallery(g)}><Pencil size={16} /></button>
                        <button title="Delete" onClick={() => deleteGallery(g)}><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          }
        </section>

        <footer><b><Palette size={16} /> ARTISTRY</b><span>A little more room for creativity.</span></footer>
      </main>
    </div>
  );
}
