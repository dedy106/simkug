window.app_saku_piutang_transaksi_fSisihARMhs = function(owner)
{
  if (owner)
	{
		window.app_saku_piutang_transaksi_fSisihARMhs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_transaksi_fSisihARMhs";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Input Penyisihan Piutang MHS : Input", 0);
		
		try
		{
			uses("portalui_saiCBBL");
			this.e0 = new portalui_saiLabelEdit(this);
			this.e0.setLeft(20);
			this.e0.setTop(30);
			this.e0.setWidth(200);
			this.e0.setCaption("No Bukti");
			this.e0.setText("");
			this.e0.setReadOnly(false);			
			this.e0.setLabelWidth(100);					
			
			this.bGenerate = new portalui_button(this);
			this.bGenerate.setTop(30);
			this.bGenerate.setLeft(230);
			this.bGenerate.setCaption("Generate");
			this.bGenerate.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bGenerate.onClick.set(this,"doGenerate");		
			
			this.l1 = new portalui_label(this);
			this.l1.setLeft(20);
			this.l1.setTop(55);
			this.l1.setWidth(100);
			this.l1.setCaption("Tanggal");			
			this.l1.setUnderLine(true);
			
			uses("portalui_datePicker");
			this.dpTgl = new portalui_datePicker(this);
			this.dpTgl.setTop(55);
			this.dpTgl.setLeft(120);
			this.dpTgl.setWidth(100);		
			this.dpTgl.onSelect.set(this,"doSelectDate");
			
			this.ePeriode = new portalui_saiLabelEdit(this);
			this.ePeriode.setLeft(20);
			this.ePeriode.setTop(80);
			this.ePeriode.setWidth(150);
			this.ePeriode.setCaption("Periode");
			this.ePeriode.setText(this.app._periode);		
			this.ePeriode.setReadOnly(true);
			
			this.eKeterangan = new portalui_saiLabelEdit(this);
			this.eKeterangan.setLeft(20);
			this.eKeterangan.setTop(105);
			this.eKeterangan.setWidth(400);
			this.eKeterangan.setCaption("Keterangan");
			this.eKeterangan.setText("");					
			
			this.bLoad = new portalui_button(this);
			this.bLoad.setTop(105);
			this.bLoad.setLeft(420);
			this.bLoad.setCaption("Load Data");
			this.bLoad.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bLoad.onClick.set(this,"doGenerate");		
			
			this.bJurnal = new portalui_button(this);
			this.bJurnal.setTop(105);
			this.bJurnal.setLeft(520);
			this.bJurnal.setCaption("Lihat Jurnal");
			this.bJurnal.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bJurnal.onClick.set(this,"doGenerate");		
			
			uses("portalui_saiTable");
			this.sg1 = new portalui_saiTable(this);
			this.sg1.setTop(130);
			this.sg1.setLeft(20);
			this.sg1.setWidth(700);
			this.sg1.setHeight(350);			
			//this.sg1.setColCount(16);
			this.sg1.setColTitle(new Array('No','No Invoice','NPM','Nama Mhs','Kode Ang','Semester','No Ujian','Kode Jur','Nilai BPP','Periode Awal','Periode Akhir','Nilai Amor','Akun PDD','Akun Pdpt','Total Amor','Kode PP','Kode DRK PDPT','Jml Periode'));							
			
			uses("portalui_sgNavigator");
			this.sgn = new portalui_sgNavigator(this);
			this.sgn.setTop(481);
			this.sgn.setLeft(20);
			this.sgn.setWidth(700);
			this.sgn.setButtonStyle(3);
			this.sgn.setGrid(this.sg1);
			this.sgn.onPager.set(this, "doSelectedPage");			
			this.sgn.setTotalPage(1);
			
			this.eTotal = new portalui_saiLabelEdit(this.sgn);
			this.eTotal.setTop(1);
			this.eTotal.setLeft(470);
			this.eTotal.setWidth(200);
			this.eTotal.setCaption("Total");
			this.eTotal.setAlignment(alRight);
			this.eTotal.setTipeText(ttNilai);
			this.eTotal.setReadOnly(true);
			
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();
		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.dtJurnal = new portalui_arrayMap();
		}catch(e)
		{
			alert("[app_saku_piutang_transaksi_fSisihARMhs]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fSisihARMhs.extend(window.portalui_childForm);
window.app_saku_piutang_transaksi_fSisihARMhs.prototype.mainButtonClick = function(sender)
{
	if (sender == this.app._mainForm.bClear)
	{
		system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");
	}
	if (sender == this.app._mainForm.bSimpan)
	{		
		system.confirm(this, "simpan", "Apa data sudah benar?","data di form ini apa sudah benar.");		
	}
	if (sender == this.app._mainForm.bEdit)
	{
		system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data di form ini akan disimpan.");
	}
	if (sender == this.app._mainForm.bHapus)
	{
		system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	}
};
window.app_saku_piutang_transaksi_fSisihARMhs.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this,["0"],this.e0);				
				this.sg1.clearAll();
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
};
window.app_saku_piutang_transaksi_fSisihARMhs.prototype.insertData = function(sql)
{	
	var line;	
	var script1 = "insert into ar_amor(no_gen, tanggal, keterangan, periode, ref1, nilai, kode_lokasi, akun_pdd, akun_pdpt, kode_pp, ref2,posted) values";
	var script2 = "update armhs_d set flag_amor = '1' where kode_lokasi = '"+this.app._lokasi+"' and kode_produk in (select kode_produk from produk where jenis = 'BPP')";	
	var scriptJurnal = "insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) values ";
	var inv = new Array();	
	if (this.app._dbEng == "mysqlt"){
		for (var i in this.sg1.data.objList)
		{
			line = this.sg1.data.get(i);
			if (i > 0) {script1 += ",";}
			script1 += "('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"','"+this.ePeriode.getText()+"','"+line.get("no_invoice")+"',"+
					" '"+parseFloat(line.get("nilai_amor"))+"','"+this.app._lokasi+"','"+line.get("akun_pdd")+"','"+line.get("akun_pdpt")+"','"+line.get("kode_pp")+"','"+line.get("npm")+"','F')";
			inv.push("'"+line.get("no_invoice")+"'");
		}		
		var urut=0;
		for (var i in this.dtJurnal.objList){
			line = this.dtJurnal.get(i);			
			urut++;
			if (line.get("dc") =="D"){
				if (i >0) {scriptJurnal += ",";}
				scriptJurnal+="('"+this.e0.getText()+"','"+this.e0.getText()+"','"+urut+"','"+this.dpTgl.getText()+"','"+line.get("kode_akun")+"' "+
					",'"+line.get("dc")+"','"+line.get("keterangan")+"','"+parseFloat(line.get("nilai"))+"','AR','AR_AM','"+this.ePeriode.getText()+"' "+
					",'"+this.app._userLog+"',now(),'"+this.app._lokasi+"','-','IDR',1,'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"')";
			}
		}
		for (var i in this.dtJurnal.objList){
			line = this.dtJurnal.get(i);			
			urut++;
			if (line.get("dc") =="C"){
				if (i >0) {scriptJurnal += ",";}
				scriptJurnal+=" ('"+this.e0.getText()+"','"+this.e0.getText()+"','"+urut+"','"+this.dpTgl.getText()+"','"+line.get("kode_akun")+"' "+
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
};
window.app_saku_piutang_transaksi_fSisihARMhs.prototype.FindBtnClick = function(sender, event)
{
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
};
window.app_saku_piutang_transaksi_fSisihARMhs.prototype.doRequestReady = function(sender, methodName, result)
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
		              this.app._mainForm.pesan(2,"process completed ("+ this.e0.getText()+")");
		              this.app._mainForm.bClear.click();              
		            }else system.info(this,result,"");
    				break;
    		}
	    }catch(e)
	    {
	       alert("step : "+step+"; error = "+e);
	    }
	}
};
window.app_saku_piutang_transaksi_fSisihARMhs.prototype.doGenerate = function(sender)
{
	if(sender == this.bGenerate)
		this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "ar_amor", "no_gen", "GA"+this.ePeriode.getText().substr(2),"000", " and kode_lokasi = '"+this.app._lokasi+"' "));	
	if (sender == this.bLoad){
		var isnull = this.app._dbEng == "mysqlt" ? "ifnull" : "isnull";
		var rs = this.dbLib.runSQL("select a.no_invoice,"+ "d.NPM,d.nama_mhs,d.kode_ang,a.semester,d.No_Ujian,d.kode_jur,a.nilai * a.jumlah as nilai_bpp,a.periode_awal,a.periode_akhir,(a.nilai/f.jml_bulan) as nilai_amor,"+
							   " a.akun_pdd,a.akun_pdpt, "+                               
                               ""+isnull+"( g.total_amor ,0) as total_amor,e.kode_proyek as kode_pp,b.kode_drk_pdpt, "+
							   "f.jml_bulan as jml_periode  "+
                               "from armhs_d a inner join produk b on a.kode_produk=b.kode_produk and b.jenis = 'BPP' and b.kode_lokasi = a.kode_lokasi "+
							   "	inner join armhs_m c on a.no_invoice=c.no_invoice and c.kode_lokasi = a.kode_lokasi "+
							   "	inner join mhs d on c.ref1=d.NPM and d.kode_lokasi = a.kode_lokasi "+
							   "	inner join jurusan e on d.kode_jur=e.kode_jur and e.kode_lokasi = a.kode_lokasi "+
							   "   	inner join param_bpp f on f.kode_produk=b.kode_produk and f.kode_ang=d.kode_ang and f.kode_jur=d.kode_jur and f.semester = a.semester and f.kode_lokasi = a.kode_lokasi "+
							   " 	left outer join (select ref1, sum(nilai) as total_amor from ar_amor where kode_lokasi ='"+this.app._lokasi+"' group by ref1) g on g.ref1 = a.no_invoice "+
                               "where  a.flag_amor ='0' and a.kode_lokasi = '"+this.app._lokasi+"' and "+
                               ""+isnull+"(g.total_amor,0) < a.nilai and c.flag_hapus='0' "+
                               "and '"+this.ePeriode.getText()+"' between a.periode_awal and a.periode_akhir "+
                               "order by d.kode_ang,d.npm");		
	   if (rs instanceof portalui_arrayMap){
			this.sg1.clearAll();
			var row;
			this.sg1.setData(rs);
			//for (var i in rs.objList){
			//	row = rs.get(i);				
			//	this.sg1.appendDataByRec(row, new Array('no_invoice','npm','nama_mhs','kode_ang','semester','no_ujian','kode_jur','nilai_bpp','periode_awal','periode_akhir','nilai_amor','akun_pdd','akun_pdpt','total_amor','kode_pp','kode_drk_pdpt'));
			//}
			this.createJurnal();
	   }else alert(rs);
	}
	if (sender == this.bJurnal){
		try{
			uses("GUI_fJurnalViewer",true);			
			this.jurnal = new GUI_fJurnalViewer(this.app);
			this.jurnal.setData(this.dtJurnal);
			this.jurnal.showModal();
		}catch(e){
			alert(e);
		}
	}	
};
window.app_saku_piutang_transaksi_fSisihARMhs.prototype.doSelectDate = function(sender, y,m,d)
{
	this.ePeriode.setText(y+""+(m < 10?'0'+m:m));
	this.bGenerate.click();
};
window.app_saku_piutang_transaksi_fSisihARMhs.prototype.createJurnal = function()
{
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
	    var total = 0;
		for (var i in this.sg1.data.objList){
			kdAkun = this.sg1.data.get(i).get("akun_pdd");
			kdPP = this.sg1.data.get(i).get("kode_pp");
			kdDrk = this.sg1.data.get(i).get("kode_drk_pdpt");
			nemu = false;
			ix = 0;
			total+= parseFloat(this.sg1.data.get(i).get("nilai_amor"));
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
				row.set("nilai",parseFloat(this.sg1.data.get(i).get("nilai_amor")));
				row.set("kode_pp",kdPP);
				row.set("kode_drk",kdDrk);
				dtJrnl++;
				dtJurnal.set(dtJrnl,row);						
			}else {
				dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(this.sg1.data.get(i).get("nilai_amor")));				
			}
			ix = -1;
			kdAkun = this.sg1.data.get(i).get("akun_pdpt");
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
				row.set("nilai",parseFloat(this.sg1.data.get(i).get("nilai_amor")));
				row.set("kode_pp",kdPP);
				row.set("kode_drk",kdDrk);
				dtJrnl++;
				dtJurnal.set(dtJrnl,row);						
			}else {				
				dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(this.sg1.data.get(i).get("nilai_amor")));				
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
};