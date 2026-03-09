const API = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

let allIssues = [];

const container = document.getElementById("issuesContainer");
const spinner = document.getElementById("spinner");

async function loadIssues() {

spinner.classList.remove("hidden");

const res = await fetch(API);
const data = await res.json();

allIssues = data.data;

spinner.classList.add("hidden");

displayIssues(allIssues);

}

loadIssues();


function displayIssues(issues) {

container.innerHTML = "";

document.getElementById("issueCount").innerText = issues.length;

issues.forEach(issue => {

const border =
issue.status === "open"
? "border-green-500"
: "border-purple-500";


// PRIORITY COLOR

let priorityColor = "badge-neutral";

if(issue.priority === "HIGH"){
priorityColor = "badge-error";
}

else if(issue.priority === "MEDIUM"){
priorityColor = "badge-warning";
}

else if(issue.priority === "LOW"){
priorityColor = "badge-success";
}


// LABEL BADGE

let labelBadge = "";

if(issue.label){

let labelColor = "badge-info";

if(issue.label === "BUG"){
labelColor = "badge-error";
}

else if(issue.label === "FEATURE"){
labelColor = "badge-primary";
}

else if(issue.label === "ENHANCEMENT"){
labelColor = "badge-success";
}

labelBadge =
`<span class="badge ${labelColor} badge-sm font-semibold">${issue.label}</span>`;

}


const card = document.createElement("div");

card.className = `
bg-white border-t-4 ${border}
rounded-lg shadow-md p-4
cursor-pointer hover:shadow-lg transition
relative
`;


card.innerHTML = `

<div class="absolute top-3 right-3">

<span class="badge ${priorityColor} text-xs font-semibold">

${issue.priority}

</span>

</div>


<h3 class="font-semibold text-gray-800 text-sm pr-12">

${issue.title}

</h3>


<p class="text-xs text-gray-600 mt-2">

${issue.description.slice(0,80)}

</p>


${labelBadge ? `<div class="mt-3">${labelBadge}</div>` : ""}


<div class="flex justify-between items-center mt-4 text-xs text-gray-500">

<p>Author: ${issue.author}</p>

<p>${issue.createdAt}</p>

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

<p><b>Author:</b> ${issue.author}</p>

<p><b>Priority:</b> ${issue.priority}</p>

<p><b>Label:</b> ${issue.label || "None"}</p>

<p><b>Created At:</b> ${issue.createdAt}</p>

<div class="modal-action">

<button class="btn" onclick="issueModal.close()">
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