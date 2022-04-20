const PORT = 5000;

const getSites = async () => {
  const res = await fetch(`/sites`);
  const data = res.json();
  return data;
};

const getSite = async (id) => {
  const res = await fetch(`/sites/${id}`);
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
  const res = await fetch(`/sites`, options);
  return res;
};

const deleteSite = async (id) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(`/sites/${id}`, options);
  return res;
};

export { getSites, postSite, getSite, deleteSite };
