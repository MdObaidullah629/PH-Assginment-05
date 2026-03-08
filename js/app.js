const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

let allIssues = [];

const container = document.getElementById("issuesContainer");
const spinner = document.getElementById("spinner");

async function loadIssues(){

spinner.classList.remove("hidden");

const res = await fetch(API);

const data = await res.json();

allIssues = data.data;

spinner.classList.add("hidden");

displayIssues(allIssues);

}

loadIssues();

function displayIssues(issues){

container.innerHTML = "";

document.getElementById("issueCount").innerText = issues.length;

issues.forEach(issue => {

const border =
issue.status === "open"
? "border-green-500"
: "border-purple-500";

const card = document.createElement("div");

card.className = `card bg-white shadow-md border-t-4 ${border} cursor-pointer hover:shadow-lg transition`;

card.innerHTML = `

<div class="card-body">

<h2 class="card-title text-sm text-gray-800">
${issue.title}
</h2>

<p class="text-xs text-gray-700">
${issue.description.slice(0,80)}
</p>

<p class="text-xs text-gray-800">
Status: ${issue.status}
</p>

<p class="text-xs text-gray-800">
Author: ${issue.author}
</p>

<p class="text-xs text-gray-800">
Priority: ${issue.priority}
</p>

<p class="text-xs text-gray-800">
Label: ${issue.label}
</p>

<p class="text-xs text-gray-800">
Created: ${issue.createdAt}
</p>

</div>

`;

card.onclick = () => openModal(issue.id);

container.appendChild(card);

});

}

function showAll(){

setActiveTab("allTab");

displayIssues(allIssues);

}

function showOpen(){

setActiveTab("openTab");

const openIssues =
allIssues.filter(issue => issue.status === "open");

displayIssues(openIssues);

}

function showClosed(){

setActiveTab("closedTab");

const closedIssues =
allIssues.filter(issue => issue.status === "closed");

displayIssues(closedIssues);

}

async function searchIssues(){

const text =
document.getElementById("searchInput").value;

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
);

const data = await res.json();

displayIssues(data.data);

}


async function openModal(id){

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
);

const data = await res.json();

const issue = data.data;

const modal = document.getElementById("issueModal");

const content = document.getElementById("modalContent");

content.innerHTML = `

<h3 class="font-bold text-lg mb-3">
${issue.title}
</h3>

<p class="mb-4">
${issue.description}
</p>

<p>Author: ${issue.author}</p>

<p>Priority: ${issue.priority}</p>

<p>Label: ${issue.label}</p>

<p>Created At: ${issue.createdAt}</p>

<div class="modal-action">

<button class="btn">
Close
</button>

</div>

`;

modal.showModal();

}


function setActiveTab(tabId){

document.getElementById("allTab").classList.remove("tab-active");
document.getElementById("openTab").classList.remove("tab-active");
document.getElementById("closedTab").classList.remove("tab-active");

document.getElementById(tabId).classList.add("tab-active");

}
