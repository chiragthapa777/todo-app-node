let filterDone;
let sortTime;

window.addEventListener("load", (e) => {
  filterDone = document.getElementById("filter-done");
  sortTime = document.getElementById("sort-time");
  populateFilters();
});

const populateFilters = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  sortTime.value = params.get("sort") ?? "";
  filterDone.value = params.get("done") ?? "";
};

function filterTodos() {
  reloadWithFilter("done", filterDone.value);
}

function sortTodos() {
  reloadWithFilter("sort", sortTime.value);
}

function reloadWithFilter(key, value) {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  if (value) {
    params.set(key, value);
  } else {
    params.delete(key);
  }
  window.location.href = `${url.pathname}?${params.toString()}`;
}

function editTodo(id) {
  document.getElementById(`edit-form-${id}`).classList.toggle("hidden");
  document.getElementById(`data-${id}`).classList.toggle("hidden");
}

function submitUpdate(id) {
  const form = document.getElementById(`edit-form-${id}`);
  const formData = new FormData(form);

  const updatedTodo = {
    name: formData.get("name"),
    description: formData.get("description"),
    dateTime: formData.get("dateTime"),
  };

  fetch(`/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTodo),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Todo updated successfully");
        location.reload();
      } else {
        alert("Error updating Todo");
      }
    });
}
