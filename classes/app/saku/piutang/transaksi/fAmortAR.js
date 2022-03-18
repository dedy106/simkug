window.app_saku_piutang_transaksi_fAmortAR = function(owner)
{
  if (owner)
	{
		window.app_saku_piutang_transaksi_fAmortAR.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_transaksi_fAmortAR";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Input Amortisasi Pendapatan Diterima Dimuka : Input", 0);
		
		try
		{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_sgNavigator;util_dbLarge");
			this.e0 = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"No Bukti", readOnly:true});						
			this.bGenerate = new portalui_button(this,{bound:[230,10,80,20], caption:"Generate",icon:"url(icon/"+system.getThemes()+"/process.png", click:"doGenerate"});						
			this.l1 = new portalui_label(this,{bound:[20,11,100,20], caption:"Tanggal", underline:true});									
			this.dpTgl = new portalui_datePicker(this,{bound:[120,11,100,18], selectDate:[this,"doSelectDate"]});						
			this.ePeriode = new portalui_saiLabelEdit(this,{bound:[20,12,150,20],caption:"Periode", text:this.app._periode, readOnly:true});									
			this.eKeterangan = new portalui_saiLabelEdit(this,{bound:[20,13,600,20],caption:"Keterangan"});						
			this.bLoad = new portalui_button(this,{bound:[840,13,80,20],caption:"Load Data",icon:"url(icon/"+system.getThemes()+"/process.png)", click:"doGenerate"});			
			
			this.bJurnal = new portalui_button(this,{bound:[740,13,80,20],caption:"Lihat Jurnal", icon:"icon/"+system.getThemes()+"/process.png)", click:"doGenerate", visible:false});
			this.sgj = new portalui_saiGrid(this,{bound:[20,10,900,150],colTitle:["Kode Akun","Nama","DC","Keterangan","Nilai","Kode PP","Kode DRK"]});
			this.sg1 = new portalui_saiGrid(this,{bound:[20,110,900,350],colCount:17,colTitle:['No Invoice','NPM','Nama Mhs','Kode Ang','Semester','No Ujian','Kode Jur','Nilai BPP','Periode Awal','Periode Akhir','Nilai Amor','Akun PDD','Akun Pdpt','Total Amor','Kode PP','Kode DRK PDPT','Jml Periode'],
                        colFormat:[[7,10,13],[cfNilai, cfNilai, cfNilai]]});			
					
			this.sgn = new portalui_sgNavigator(this,{bound:[20,14,900,25], pager:[this,"doSelectedPage"]});						
			this.eTotal = new portalui_saiLabelEdit(this.sgn,{bound:[1,670,200,20],caption:"Total", tipeText:ttNilai, alignment:alRight, readOnly:true});									
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();
		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);			
			this.dbLib2 = new util_dbLarge();
			this.dbLib2.addListener(this);
			this.standarLib = new util_standar();
			this.dtJurnal = new portalui_arrayMap();
			this.rearrangeChild(10,23);
			this.dpTgl.setDateString(new Date().getDateStr());
			this.rowPerPage = 100;
		}catch(e)
		{
			alert("[app_saku_piutang_transaksi_fAmortAR]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fAmortAR.extend(window.portalui_childForm);
window.app_saku_piutang_transaksi_fAmortAR.implement({
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");			
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data di form ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	},
	doModalResult: function(event, modalResult){
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this,["0"],this.e0);				
					this.sg1.clear(1);
					this.dpTgl.setDateString(new Date().getDateStr());
				}
			break;
			case "simpan" :
				if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this,["0"])))
				{
					try
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						this.insertData(sql);
					}catch(e)
					{
						system.alert(this, e,"");
					}
				}
			break;
			case "ubah" :
				if (modalResult == mrOk)
				{				
						uses("server_util_arrayList");					
						var sql = new server_util_arrayList();					
						this.insertData(sql);
				}
			break;
			case "hapus" :
			   if (modalResult == mrOk)
			   {			  
					  uses("server_util_arrayList");					
						var sql = new server_util_arrayList();
						sql.add("delete from load_mhs where kode_jur='"+this.e0.getText()+"' and kode_ang='"+this.e1.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
						this.dbLib.execArraySQL(sql);					
			   }
			break;
		}
		this.e0.setFocus();
	},
	insertData: function(sql){	
		var line;	
		var script1 = "insert into ar_amor(no_gen, tanggal, keterangan, periode, ref1, nilai, kode_lokasi, akun_pdd, akun_pdpt, kode_pp, ref2,posted,flag_hapus) values";
		var script2 = "update armhs_d set flag_amor = '1' where kode_lokasi = '"+this.app._lokasi+"' and kode_produk in (select kode_produk from produk where jenis = 'BPP')";	
		var scriptJurnal = "insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) values ";
		var inv = new Array();	
		if (this.app._dbEng == "mysqlt"){
			for (var i in this.sg1.data.rows)
			{
				line = this.sg1.data.rows[i];
				if (i > 0) {script1 += ",";}
				script1 += "('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"','"+this.ePeriode.getText()+"','"+line.no_invoice+"',"+
						" '"+parseFloat(line.nilai_amor)+"','"+this.app._lokasi+"','"+line.akun_pdd+"','"+line.akun_pdpt+"','"+line.kode_pp+"','"+line.npm+"','F','F')";
				inv.push("'"+line.no_invoice+"'");
			}		
			var urut=0;
			for (var i in this.dtJurnal.objList){
				line = this.dtJurnal.get(i);			
				urut++;
				if (line.get("dc") =="D"){
					if (i >0) {scriptJurnal += ",";}
					scriptJurnal+="('"+this.e0.getText()+"','"+this.e0.getText()+"','"+urut+"','"+this.dpTgl.getDateString()+"','"+line.get("kode_akun")+"' "+
						",'"+line.get("dc")+"','"+line.get("keterangan")+"','"+parseFloat(line.get("nilai"))+"','AR','AR_AM','"+this.ePeriode.getText()+"' "+
						",'"+this.app._userLog+"',now(),'"+this.app._lokasi+"','-','IDR',1,'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"')";
				}
			}
			for (var i in this.dtJurnal.objList){
				line = this.dtJurnal.get(i);			
				urut++;
				if (line.get("dc") =="C"){
					if (i >0) {scriptJurnal += ",";}
					scriptJurnal+=" ('"+this.e0.getText()+"','"+this.e0.getText()+"','"+urut+"','"+this.dpTgl.getDateString()+"','"+line.get("kode_akun")+"' "+
						",'"+line.get("dc")+"','"+line.get("keterangan")+"','"+parseFloat(line.get("nilai"))+"','AR','AR_AM','"+this.ePeriode.getText()+"' "+
						",'"+this.app._userLog+"',now(),'"+this.app._lokasi+"','-','IDR',1,'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"')";
				}
			}		
			sql.add(script1);
			if (inv.length > 0)
				sql.add(script2 + " and no_invoice in ("+inv+")");		
			sql.add(scriptJurnal);
		}else{
			script = "";
			scriptARM = "";
			scriptARD = "";
			for (var i=0; i < this.sg1.rows.getLength(); i++)
			{										
			}
		}					
		this.dbLib.execArraySQL(sql);	
	},
	FindBtnClick: function(sender, event){
		switch(sender){
			case this.eJurusan :
				this.standarLib.showListData(this, "Data Jurusan",sender,undefined, 
										  "select kode_jur, nama_jur from jurusan where kode_lokasi = '"+this.app._lokasi+"' ","select count(*) from jurusan where kode_lokasi = '"+this.app._lokasi+"' ",
										 ["kode_jur","nama_jur"],"and",["Kode Jurusan","Nama Jurusan"]);
			break;
			case this.eAngkatan :
				this.standarLib.showListData(this, "Data Angkatan",sender,undefined, 
										  "select kode_ang, nama_ang from angkatan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"' ","select count(*) from jurusan where kode_lokasi = '"+this.app._lokasi+"' and kode_jur = '"+this.eJurusan.getText()+"'",
										["kode_ang","nama_ang"],"and",["Kode Angkatan","Nama Angkatan"]);
			break;
		}
	},
	doRequestReady: function(sender, methodName, result){
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
						  this.app._mainForm.pesan(2,"process completed ("+ this.e0.getText()+")");
						  this.app._mainForm.bClear.click();              
						}else system.info(this,result,"");
					break;    			
				}
			}catch(e){
				this.sg1.hideLoading();
				alert(e);
			}
		}
		if (sender == this.dbLib2){
		//case "getDataProvider":
			if (methodName){
					this.sg1.showLoading();									
					eval("var rs = "+result+";");				
					if (typeof rs != "string"){    			        
						rs = rs.rs;  
						this.sg1.clear();	
						this.sg1.data = rs;
						this.sgn.setTotalPage(Math.ceil(rs.rows.length / this.rowPerPage));
						this.sgn.rearrange();
						this.sgn.setButtonStyle(3);		
						var row;
						for (var i in rs.rows){
							if (i == this.rowPerPage) break;
							row = rs.rows[i];
							this.sg1.appendData([row.no_invoice,row.npm,row.nama_mhs,row.kode_ang,row.semester,row.no_ujian,row.kode_jur,floatToNilai(row.nilai_bpp),
									row.periode_awal,row.periode_akhir,floatToNilai(row.nilai_amor),row.akun_pdd,row.akun_pdpt,floatToNilai(row.total_amor),row.kode_pp,row.kode_drk_pdpt, row.jml_periode]);
							
						}
						this.createJurnal();
						this.bJurnal.click();
					}else alert(result); 
					this.sg1.hideLoading();
			}
		//break;
		}
	},
	doGenerate: function(sender){
		if(sender == this.bGenerate)
			this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "ar_amor", "no_gen", "GA"+this.ePeriode.getText().substr(2),"000", " and kode_lokasi = '"+this.app._lokasi+"' "));	
		if (sender == this.bLoad){
			try{    		    	
				this.dbLib2.getDataProviderA("select a.no_invoice,"+
									   "d.npm,d.nama_mhs,d.kode_ang,a.semester,d.no_ujian,d.kode_jur,a.nilai * a.jumlah as nilai_bpp,a.periode_awal,a.periode_akhir,round(a.nilai/f.jml_bulan,0) as nilai_amor,"+
									   " a.akun_pdd,a.akun_pdpt, "+                               
									   "ifnull( g.total_amor ,0) as total_amor,b.kode_pp,b.kode_drk_pdpt, "+
									   "f.jml_bulan as jml_periode  "+
									   "from armhs_d a inner join produk b on a.kode_produk=b.kode_produk and b.jenis = 'BPP' and b.kode_lokasi = a.kode_lokasi "+
									   "	inner join armhs_m c on a.no_invoice=c.no_invoice and c.kode_lokasi = a.kode_lokasi "+
									   "	inner join mhs d on c.ref1=d.NPM and d.kode_lokasi = a.kode_lokasi "+
									   "	inner join jurusan e on d.kode_jur=e.kode_jur and e.kode_lokasi = a.kode_lokasi "+
									   "   	inner join param_bpp f on f.kode_produk=b.kode_produk and f.kode_ang=d.kode_ang and f.kode_jur=d.kode_jur and f.semester = a.semester and f.kode_lokasi = a.kode_lokasi "+
									   " 	left outer join (select ref1, sum(nilai) as total_amor from ar_amor where kode_lokasi ='"+this.app._lokasi+"' group by ref1) g on g.ref1 = a.no_invoice "+
									   "where a.kode_lokasi = '"+this.app._lokasi+"' and "+
									   "ifnull(g.total_amor,0) < (a.nilai * a.jumlah) and c.flag_hapus='0' "+
									   "and '"+this.ePeriode.getText()+"' between a.periode_awal and a.periode_akhir "+
									   "order by d.kode_ang,d.npm",true);
		   }catch(e){
				//this.sg1.hideLoading();
				alert(e);
		   }
		}
		if (sender == this.bJurnal){
			try{			
				this.sgj.setData(this.dtJurnal);
			}catch(e){
				alert(e);
			}
		}	
	},
	doSelectDate: function(sender, y,m,d){
		this.ePeriode.setText(y+""+(m < 10?'0'+m:m));
		this.bGenerate.click();
	},
	doSelectedPage: function(sender, page){
		try{
			this.sg1.clear();
			var dari = (page - 1) * this.rowPerPage;
			var sampai = dari + this.rowPerPage;
			if (sampai > this.sg1.data.rows.length) sampai = this.sg1.data.rows.length;        
			for (var i=dari; i < sampai ;i++){
				row = this.sg1.data.rows[i];
				this.sg1.appendData([row.no_invoice,row.npm,row.nama_mhs,row.kode_ang,row.semester,row.no_ujian,row.kode_jur,floatToNilai(parseFloat(row.nilai_bpp)),
						row.periode_awal,row.periode_akhir,floatToNilai(parseFloat(row.nilai_amor)),row.akun_pdd,row.akun_pdpt,floatToNilai(parseFloat(row.total_amor)),row.kode_pp,row.kode_drk_pdpt, row.jml_periode]);        
			}    	
			this.sg1.setNoUrut(dari);
		}catch(e){
			systemAPI.alert(e);
		}
	},
	createJurnal: function(){
		try{
			var dtJurnal = new portalui_arrayMap();	
			var nemu, kdAkun, kdPP, kdDrk,row;
	//----------------------------------- buffering Akun	
			var row, ix, dtJrnl = -1,bufferAkun= new Array(), tmp = this.dbLib.loadQuery("select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ");		
			tmp = tmp.split("\r\n");
			for (var i in tmp){	
				row = tmp[i].split(";");
				if (i > 0)
					bufferAkun[row[0]] = row[1];
			}		
	//----------------------------------- end buffering Akun	
			var total = 0, line;
			for (var i in this.sg1.data.rows){
				line = this.sg1.data.rows[i];
				kdAkun = line.akun_pdd;
				kdPP = line.kode_pp;
				kdDrk = line.kode_drk_pdpt;
				nemu = false;
				ix = 0;
				total+= parseFloat(line.nilai_amor);
				for (var j in dtJurnal.objList){		
				  if (kdAkun == dtJurnal.get(j).get("kode_akun") && kdPP == dtJurnal.get(j).get("kode_pp") && kdDrk == dtJurnal.get(j).get("kode_drk")){
					nemu = true;
					row = dtJurnal.get(j);
					ix = j;
					break;
				  }
				}
				if (!nemu){
					row = new portalui_arrayMap();
					row.set("kode_akun",kdAkun);
					row.set("nama",bufferAkun[kdAkun]);
					row.set("dc","D");
					row.set("keterangan","Jurnal PDD "+ this.e0.getText());
					row.set("nilai",parseFloat(line.nilai_amor));
					row.set("kode_pp",kdPP);
					row.set("kode_drk",kdDrk);
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else {
					dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(line.nilai_amor));				
				}
				ix = -1;
				kdAkun = line.akun_pdpt;
				for (var j in dtJurnal.objList){		
				  if (kdAkun == dtJurnal.get(j).get("kode_akun") && kdPP == dtJurnal.get(j).get("kode_pp") && kdDrk == dtJurnal.get(j).get("kode_drk")){
					nemu = true;
					row = dtJurnal.get(j);
					ix = j;
					break;
				  }
				}
				if (!nemu){
					row = new portalui_arrayMap();
					row.set("kode_akun",kdAkun);
					row.set("nama",bufferAkun[kdAkun]);
					row.set("dc","C");
					row.set("keterangan","Jurnal PDD "+ this.e0.getText());
					row.set("nilai",parseFloat(line.nilai_amor));
					row.set("kode_pp",kdPP);
					row.set("kode_drk",kdDrk);
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else {				
					dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(line.nilai_amor));				
				}
			}
			var desc1 = new portalui_arrayMap();
			desc1.set("kode_akun",80);
			desc1.set("nama",200);
			desc1.set("dc",50);
			desc1.set("keterangan",250);
			desc1.set("nilai",100);
			desc1.set("kode_pp",80);
			desc1.set("kode_drk",80);
			var desc2 = new portalui_arrayMap();
			desc2.set("kode_akun","S");
			desc2.set("nama","S");
			desc2.set("dc","S");
			desc2.set("keterangan","S");
			desc2.set("nilai","N");
			desc2.set("kode_pp","S");
			desc2.set("kode_drk","S");	
			var dataDesc = new portalui_arrayMap();
			dataDesc.set(0,desc1);
			dataDesc.set(1,desc2);
			dtJurnal.setTag2(dataDesc);
			this.dtJurnal = dtJurnal;
			this.eTotal.setText(floatToNilai(total));
		}catch(e){
			alert(e);
		}
	}
});
