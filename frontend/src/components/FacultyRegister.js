function FacultyRegister() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async () => {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, role: "faculty" })
    });
    const data = await res.json();
    localStorage.setItem("token", data.token);
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <input placeholder="Name" onChange={e => setForm({...form, name: e.target.value})}/>
      <input placeholder="Email" onChange={e => setForm({...form, email: e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})}/>
      <button type="submit">Register as Faculty</button>
    </form>
  );
}