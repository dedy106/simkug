/**
 * @author mr
 */
window.app_budget_transaksi_fFasusutbpp = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fFasusutbpp.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fFasusutbpp";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Input Beban Penyusutan dan BPP Aktiva Tetap: Input/Koreksi", 0);	
					
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,10,180,20],caption:"Tahun Anggaran",tipeText: ttAngka,maxLength:4,tag:2,change:[this,"doChange"]});					
	
		uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator;app_budget_svrProcess");	
		this.dp_tgl1 = new portalui_datePicker(this);
		this.dp_tgl1.setTop(32);
		this.dp_tgl1.setLeft(120);
		this.dp_tgl1.setWidth(82);
		this.dp_tgl1.setReadOnly(true);
		this.dp_tgl1.setBtnVisible(false);		
		this.dp_tgl1.hide();
	
        this.ed_nb = new portalui_saiLabelEdit(this);
		this.ed_nb.setLeft(20);
		this.ed_nb.setTop(32);
		this.ed_nb.setWidth(220);
		this.ed_nb.setCaption("No Bukti");
		this.ed_nb.setText(""); 
		this.ed_nb.setReadOnly(true);
			
		this.bGen = new portalui_button(this);
		this.bGen.setLeft(246);
		this.bGen.setTop(32);
		this.bGen.setCaption("Gen");
		this.bGen.setIcon("url(icon/"+system.getThemes()+"/process.png)");
		
		this.ed_total = new portalui_saiLabelEdit(this);
		this.ed_total.setLeft(20);
		this.ed_total.setTop(98);
		this.ed_total.setWidth(220);
		this.ed_total.setTipeText(ttNilai);
		this.ed_total.setAlignment(alRight);
		this.ed_total.setLabelWidth(100);
		this.ed_total.setCaption("Total Nilai BP");
		this.ed_total.setText("0"); 
		this.ed_total.setReadOnly(true);
		this.ed_total.setTag("1");
		
		this.ed_total2 = new portalui_saiLabelEdit(this);
		this.ed_total2.setLeft(20);
		this.ed_total2.setTop(120);
		this.ed_total2.setWidth(220);
		this.ed_total2.setTipeText(ttNilai);
		this.ed_total2.setAlignment(alRight);
		this.ed_total2.setLabelWidth(100);
		this.ed_total2.setCaption("Total Nilai BPP");
		this.ed_total2.setText("0"); 
		this.ed_total2.setReadOnly(true);
		this.ed_total2.setTag("1");
		
		this.bHitung = new portalui_button(this);
		this.bHitung.setLeft(760);
		this.bHitung.setTop(120);
		this.bHitung.setCaption("Hitung BP");
		
		this.bHitung2 = new portalui_button(this);
		this.bHitung2.setLeft(840);
		this.bHitung2.setTop(120);
		this.bHitung2.setCaption("Hitung BPP");
		
		this.p1 = new portalui_panel(this);
		this.p1.setLeft(20);
	    this.p1.setTop(186);
	    this.p1.setWidth(900);
	    this.p1.setHeight(288);
	    this.p1.setName('p1');
	    this.p1.setCaption('Item Data Beban Penyusutan Aktap');
				
		this.sg1 = new portalui_saiGrid(this.p1, {bound: [1, 20, 895, 235],tag: 2,readOnly: true,
			colTitle: ["No Aktap","Deskripsi","Nilai Perolehan","Tgl Perolehan","Kode PP","Nama PP","Akun Aktap","Nama Akun","Akun BP","Nama BP","Akun Depresiasi","Nama Akun Deprs",
                      "%Susut","Umur[bln]","N. Susut/bln","Total Akum. Susut","Jml Susut [bln]","Ttl Angg. Susut","Jenis Agg","Periode Susut","RKA BP"]
		});    			
		this.sgNav1 =  new portalui_sgNavigator(this.p1,{bound:[1,260,895,25], grid:this.sg1, border:0, buttonStyle:3, pager:[this,"doPager"]});
	
		this.p2 = new portalui_panel(this);
	    this.p2.setLeft(20);
	    this.p2.setTop(209);
	    this.p2.setWidth(900);
	    this.p2.setHeight(288);
	    this.p2.setName('p2');
	    this.p2.setCaption('Item Data Beban Pemeliharaan dan Perbaikan Aktap');
		
		uses("portalui_saiGrid;portalui_sgNavigator");	
		this.sg2 = new portalui_saiGrid(this.p2, {bound: [1, 20, 895, 235],tag: 2,readOnly: true,
			colTitle: ["No Aktap","Deskripsi","Nilai Perolehan","Tgl Perolehan","Kode PP","Nama PP","Akun Aktap","Nama Akun","Kode Param","Nama Parameter","Akun BPP","Nama Akun BPP",
                      "Umur Aktap[bln]","Satuan","Nilai","Jns Periode","Total","Jenis Agg","RKA BPP"]
		});    			
		this.sgNav2 =  new portalui_sgNavigator(this.p2,{bound:[1,260,895,25], grid:this.sg2, border:0, buttonStyle:3, pager:[this,"doPager"]});		
		this.rearrangeChild(10,23);		
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
		try
		{		    
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    uses("util_standar");
		    this.standarLib = new util_standar();
		    uses("util_addOnLib");
		    this.addOnLib = new util_addOnLib();
			uses("util_gridLib");
			this.gridLib=new util_gridLib();
			
			this.bGen.onClick.set(this, "genClick");
			this.bHitung.onClick.set(this, "genClick");
			this.bHitung2.onClick.set(this, "genClick");
			this.dp_tgl1.onSelect.set(this,"doSelect");
			
			this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);
			this.sg1.clear(1); this.sg2.clear(1); 
			
			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'AKTAP' and tahun = '"+this.eTahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}
			
			this.svrProcess = new app_budget_svrProcess();
			this.svrProcess.addListener(this);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fFasusutbpp.extend(window.portalui_childForm);
window.app_budget_transaksi_fFasusutbpp.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{
		system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_budget_transaksi_fFasusutbpp.prototype.simpan = function()
{	
	if (this.standarLib.checkEmptyByTag(this, new Array("0","1"))){
		if (this.prog != "0") {
			system.alert(this,"Transaksi tidak valid.","Transaksi Aktiva tetap telah di Close.");
			return false;
		}
		try{
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_fasusut_m','no_fasusut',this.app._lokasi+"-BAT"+this.eTahun.getText()+".",'0000'));
			this.svrProcess.saveData(this.ed_nb.getText(), this.app._lokasi, this.dp_tgl1.getDateString(), this.eTahun.getText(), this.periodeBefore, this.app._userLog);
		}
		catch(e)
		{
			system.alert(this, e,"");
		}
	}
};
window.app_budget_transaksi_fFasusutbpp.prototype.doModalResult = function(event, modalResult)
{
	if (modalResult != mrOk) return false;
	
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);	
				this.sg1.clear(1); this.sg2.clear(1); 
			}
			break;
		
		case "simpan" :		
			if (this.prog != "0") {
				system.alert(this,"Transaksi tidak valid.","Transaksi AKTAP telah di Close.");
				return false;
			} 

			/*
			if (nilaiToFloat(this.ed_total.getText()) == 0 || nilaiToFloat(this.ed_total2.getText()) == 0)
			{
				system.alert(this,"Nilai BP/BPP tidak valid.","Nilai total tidak boleh nol.");
				return false;
			}
			else 
			*/
			this.simpan();
			break;
			
		case "simpancek" : this.simpan();			
			break;
			
	}
};
window.app_budget_transaksi_fFasusutbpp.prototype.genClick = function(sender)
{
	try{
		if (sender == this.bGen){
			if (this.eTahun.getText() != ""){
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_fasusut_m','no_fasusut',this.app._lokasi+"-BAT"+this.eTahun.getText()+".",'0000'));
			}
			else{
				system.alert(this,"Periode harus valid.","");			
			}
		}
		if (sender == this.bHitung){
			this.sg1.clear();
			var temp = this.dbLib.runSQL("select a.no_fa,a.nama,a.nilai,a.tgl_perolehan,a.kode_pp2 as kode_pp,xx.nama as nama_pp, "+
										 "	b.kode_akun,aa.nama as nama_1,b.akun_bp,ab.nama as nama_2,b.akun_deprs,ac.nama as nama_3,"+
										 "	a.persen,a.umur,round(a.nilai * a.persen/100/12,0) as nilai_susut "+
										 "  ,  case when (datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1) * (round(a.nilai * a.persen/100/12,0)) < 0 then 0 else (datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1) * (round(a.nilai * a.persen/100/12,0)) end as akum_susut "+
										 "	,  case when datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1 > 0 then (case when (a.umur - (case when (datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1) < a.umur then (datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1) else a.umur end)) > 12 then 12 else (a.umur - (case when (datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1) < a.umur then (datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1) else a.umur end)) end) else (12 + datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1) end as sisa_umur  "+
										 "	, (case when datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1 > 0 then (case when (a.umur - (case when (datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1) < a.umur then (datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1) else a.umur end)) > 12 then 12 else (a.umur - (case when (datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1) < a.umur then (datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1) else a.umur end)) end) else (12 + datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1) end) * (round(a.nilai * a.persen/100/12,0)) as susutnext  "+										 
										 "	,  case a.jenis_agg when 'P' then 'ESTIMASI' when 'T' then 'TAMBAH' when 'E' then 'EXIST' end as jenis_agg,a.periode_susut,a.kode_rka2 "+
										 "from agg_fa_asset a "+	
										 "	inner join agg_fa_klpakun b on a.kode_klpakun=b.kode_klpakun "+
										 "	inner join agg_pp xx on xx.kode_pp = a.kode_pp2 and xx.kode_lokasi = a.kode_lokasi "+
										 "	inner join agg_masakun aa on aa.kode_akun = b.kode_akun and aa.kode_lokasi = '"+this.app._lokasi+"' "+
										 "	inner join agg_masakun ab on ab.kode_akun = b.akun_bp and ab.kode_lokasi = '"+this.app._lokasi+"' "+
										 "	inner join agg_masakun ac on ac.kode_akun = b.akun_deprs and ac.kode_lokasi = '"+this.app._lokasi+"'  "+ 
										 "where a.kode_lokasi='"+this.app._lokasi+"' and a.tahun_agg='"+this.eTahun.getText()+"' and "+
										 "	case when (a.umur - (case when (datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1) < a.umur then (datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1) else a.umur end)) > 12 then 12 else (a.umur - (case when (datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1) < a.umur then (datediff(month,a.tgl_susut,'"+this.dp_tgl1.getDateString()+"')+1) else a.umur end)) end > 0 "+
										 "order by a.jenis,a.no_fa"); //and a.status_aktif = '1'
			
			if (temp instanceof portalui_arrayMap) {
				var tot = 0;
				for (var i in temp.objList){
					temp.get(i).set("jenis_agg",temp.get(i).get("jenis_agg").toUpperCase());
					tot += parseFloat(temp.get(i).get("susutnext"));
				}			
				this.ed_total.setText(floatToNilai(tot));
				this.sg1.setData(temp,true,20);
				this.sgNav1.setTotalPage(this.sg1.pageCount);				
				this.sgNav1.rearrange();
				this.sgNav1.activePage = 0;
			}else systemAPI.alert(temp);
		}
		if (sender == this.bHitung2){
			this.sg2.clear();
			var temp2 = this.dbLib.runSQL("select "+
										"a.no_fa,a.nama,a.nilai,date_format(a.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan,a.kode_pp3 as kode_pp,xx.nama as nama_pp, "+
										"z.kode_akun,zz.nama as nama_akun, "+
										"cc.kode_param,cc.nama as nama_param,b.kode_akun as akun_bpp,c.nama as nama_bpp, "+ 	
										"case when (datediff(month,a.tgl_perolehan,'"+this.dp_tgl1.getDateString()+"')+1) <0 then 0 else (datediff(month,a.tgl_perolehan,'"+this.dp_tgl1.getDateString()+"')+1) end as umur, "+ 	
										"b.satuan,round(b.tarif*b.jumlah*b.volume,0) * a.jumlah as nilai_sat,case when b.jns_periode <> 'X' then b.jns_periode else substring(periode,5,2) end as jns_periode,"+
										"isnull(case when substring(b.jns_periode,1,1) = 'A' then round(a.jumlah*b.tarif*b.jumlah*b.volume,0) * (4 - case when datediff(month,a.tgl_perolehan,'"+this.dp_tgl1.getDateString()+"')+1 >= 0 then 0 else   ceiling(cast(abs(datediff(month,a.tgl_perolehan,'"+this.dp_tgl1.getDateString()+"')+1) as float)/3) end )"+
										"     when substring(b.jns_periode,1,1) = 'B' then round(a.jumlah*b.tarif*b.jumlah*b.volume,0) * (2 - case when datediff(month,a.tgl_perolehan,'"+this.dp_tgl1.getDateString()+"')+1 >= 0 then 0 else   ceiling(cast(abs(datediff(month,a.tgl_perolehan,'"+this.dp_tgl1.getDateString()+"')+1) as float)/6) end) "+
										"     when substring(b.jns_periode,1,1) = 'C' then round(a.jumlah*b.tarif*b.jumlah*b.volume,0) * case when datediff(month,a.tgl_perolehan,'"+this.dp_tgl1.getDateString()+"')+1 >= 0 then 12 else 12 + datediff(month,a.tgl_perolehan,'"+this.dp_tgl1.getDateString()+"')+1 end "+
										"     else round(a.jumlah*b.tarif*b.jumlah*b.volume,0) end ,0) "+
										"as total, "+
										"case a.jenis_agg when 'P' then 'ESTIMASI' when 'T' then 'TAMBAH' when 'E' then 'EXIST' end as jenis_agg,cc.kode_rka as kode_rka3  "+
										"from agg_fa_asset a "+		
										"	inner join agg_pp xx on xx.kode_pp = a.kode_pp3 and xx.kode_lokasi = a.kode_lokasi "+
										"	inner join agg_fa_klpakun z on a.kode_klpakun=z.kode_klpakun "+		
										"	inner join agg_masakun zz on z.kode_akun=zz.kode_akun and zz.kode_lokasi='"+this.app._lokasi+"' "+	
										"	inner join agg_fa_klp bb on a.kode_klpfa=bb.kode_klpfa "+		
										"	inner join agg_fa_param_d b on bb.kode_klpfa=b.kode_klpfa and b.kode_lokasi ='"+this.app._lokasi+"' and b.tahun = '"+this.eTahun.getText()+"' "+		
										"	inner join agg_fa_param_m cc on b.kode_param = cc.kode_param and b.kode_lokasi='"+this.app._lokasi+"' "+
										"	inner join agg_masakun c on c.kode_akun=b.kode_akun and b.kode_lokasi=c.kode_lokasi "+	
										"where a.status_aktif='1' and a.tahun_agg='"+this.eTahun.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' "+
										"order by a.jenis,a.no_fa");
			if (temp2 instanceof portalui_arrayMap) {
				var tot = 0;
				for (var i in temp2.objList){
					temp2.get(i).set("jenis_agg",temp2.get(i).get("jenis_agg").toUpperCase());
					tot += parseFloat(temp2.get(i).get("total"));
				}			
				this.ed_total2.setText(floatToNilai(tot));
				this.sg2.setData(temp2,true,20);
				this.sgNav2.setTotalPage(this.sg2.pageCount);				
				this.sgNav2.rearrange();
				this.sgNav2.activePage = 0;
			}else systemAPI.alert(temp2);
		}
	}
	catch (e)
	{
		alert(e);
	}
};
window.app_budget_transaksi_fFasusutbpp.prototype.doChange = function(sender)
{
	var thn = parseFloat(this.eTahun.getText()) - 1;
	this.dp_tgl1.setText('31/12/'+thn);
	this.periodeBefore = thn+'12';
	
	var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'AKTAP' and tahun = '"+this.eTahun.getText()+"'",true);
	if (typeof data == "object"){
		this.prog = data.rs.rows[0].progress;
	}	
};
											  

window.app_budget_transaksi_fFasusutbpp.prototype.doPager= function(sender, page){
	try{		
		if (sender == this.sgNav1) this.sg1.selectPage(page);
		if (sender == this.sgNav2) this.sg2.selectPage(page);
	}catch(e){
		alert(e);
	}
};
window.app_budget_transaksi_fFasusutbpp.prototype.doRequestReady = function(sender, methodName, result)
{
	if (sender == this.dbLib)
	{
		try
		{   
			switch(methodName)
    		{
    			case "execArraySQL" :
    			step="info";
				if (result.toLowerCase().search("error") == -1)					
				{
					this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.ed_nb.getText()+")");
					this.app._mainForm.bClear.click();              
				}else system.info(this,result,"");
    			break;
    		}    		
		}
		catch(e)
		{
			alert("step : "+step+"; error = "+e);
		}
    }
    if (sender == this.svrProcess){
		if (methodName == "saveData"){
			if (result.toLowerCase().search("error") == -1)					
				{
					this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.ed_nb.getText()+")");
					this.app._mainForm.bClear.click();              
				}else system.info(this,result,"");
		}
	} 
};
