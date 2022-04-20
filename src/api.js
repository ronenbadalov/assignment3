const PORT = 5000;

const getSites = async () => {
  const res = await fetch(`http://127.0.0.1:${PORT}/sites`);
  const data = res.json();
  return data;
};

const getSite = async (id) => {
  const res = await fetch(`http://127.0.0.1:${PORT}/sites/${id}`);
  const data = res.json();
  return data;
};

const postSite = async (site) => {
  const options = {
    method: "POST",
    body: JSON.stringify(site),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(`http://127.0.0.1:${PORT}/sites`, options);
  return res;
};

const deleteSite = async (id) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(`http://127.0.0.1:${PORT}/sites/${id}`, options);
  return res;
};

export { getSites, postSite, getSite, deleteSite };
