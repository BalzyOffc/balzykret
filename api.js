/*
 * BALZY PANEL MANAGER — API CONFIG
 * Isi domain dan Application API Key di file ini.
 * Peringatan: file ini dikirim ke browser dan key dapat dilihat pengunjung.
 * Gunakan hanya pada deployment privat dengan key berizin minimum.
 */
const CONFIG={defaults:{eggId:'15',locationId:'1'},panels:[
 {name:'Server 1',domain:'https://balzyofficial.panel.pteroq.biz.id',applicationKey:'ptla_MZlfYojZRlAzeMlLyu2HGIbPXPOaoxXS9VJRu6dgx9t',clientKey:'ptlc_RDxyi7uIuWsyxbpjnt0heWnhSBvZ1caQxa99kBoXQu8'},
 {name:'Server 2',domain:'https://balzyofficial.panel.pteroq.biz.id',applicationKey:'ptla_MZlfYojZRlAzeMlLyu2HGIbPXPOaoxXS9VJRu6dgx9t',clientKey:'ptlc_RDxyi7uIuWsyxbpjnt0heWnhSBvZ1caQxa99kBoXQu8'}
]};

async function api(panelIndex,path,opts={}){const p=CONFIG.panels[panelIndex];if(!validPanel(p))throw Error(`${p.name}: konfigurasi domain / Application API Key belum diisi.`);const url=p.domain.replace(/\/$/,'')+'/api/application'+path;let res;try{res=await fetch(url,{...opts,mode:'cors',credentials:'omit',headers:{Accept:'Application/vnd.pterodactyl.v1+json','Content-Type':'application/json',Authorization:'Bearer '+p.applicationKey,...opts.headers}})}catch(e){throw Error('Gagal menghubungi API. Penyebab umum: CORS/preflight OPTIONS belum diizinkan oleh provider, domain/SSL panel bermasalah, atau API tidak dapat dijangkau. Deploy Vercel tidak otomatis mengatasi CORS. Detail: '+e.message)}let data={};try{data=await res.json()}catch{}if(!res.ok){const detail=data.errors?.map(x=>x.detail||x.code).join('; ')||data.message||`HTTP ${res.status}`;throw Error(detail)}return data}
