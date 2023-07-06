const API = "http://sample.bmaster.kro.kr/contacts";

function getPageno(){
 const params = new URLSearchParams(location.search);
 const pageno = parseInt(params.get('pageno')); 

 if(isNaN(pageno)){
    return 1;
  }else if(pageno<1){
    return 1;
  }else{
    return pageno;
  }
}

async function fetch(pageno=1, pagesize=10){
  const url = `${API}?pageno=${pageno}&pagesize=${pagesize}`;
  try{
    return await $.ajax(url);
  }catch(err){
    console.log(err);
    return null;
  }
}

function printContacts(contacts) {
  const $tbody = $('#tbody');
  for(c of contacts) {
    const html = `
      <tr>
        <td>${c.no}</td>
        <td><a href='read.html?no=${c.no}'>${c.name}</a></td>
        <td>${c.tel}</td>
        <td>${c.address}</td>
      </tr>
    `;
    $tbody.append(html);
  }
}

function getPagination({pageno,pagesize,totalcount, blockSize=5}){
  const countOfPage = Math.ceil(totalcount/pagesize);
  const prev = Math.floor((pageno-1)/blockSize)*blockSize;
  const start = prev+1;
  let end = prev + blockSize;
  let next = end + 1;
  if(end>=countOfPage) {
    end = countOfPage;
    next = 0;
  }
  return {prev, start, end, next, pageno};
}

function printPagination({prev, start, end, next, pageno}) {
  const $pagination = $('#pagination');
  if(prev>0) {
    const html =`
      <li class='page-item'>
        <a class='page-link' href='list(0706).html?pageno=${prev}'>이전으로</a>
      </li>
    `;
    $pagination.append(html);
  }
  for(let i=start; i<=end; i++) {
    const className = pageno===i? 'page-item active' : 'page-item';
    const html =`
      <li class='${className}'>
        <a class='page-link' href='list(0706).html?pageno=${i}'>${i}</a>
      </li>
    `;
    $pagination.append(html);  
  }
  if(next>0) {
    const html =`
      <li class='page-item'>
        <a class='page-link' href='list(0706).html?pageno=${next}'>다음으로</a>
      </li>
    `;
    $pagination.append(html);
  }
}
