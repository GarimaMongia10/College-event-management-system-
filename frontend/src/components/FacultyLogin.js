function FacultyLogin() {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    localStorage.setItem("token", data.token);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})}/>
      <button type="submit">Login as Faculty</button>
    </form>
  );
}