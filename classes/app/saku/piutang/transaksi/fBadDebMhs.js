/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
*************************************************************************************************/
window.app_saku_piutang_transaksi_fBadDebMhs = function(owner)
{
  if (owner)
	{
		window.app_saku_piutang_transaksi_fBadDebMhs.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_piutang_transaksi_fBadDebMhs";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Penyisihan Piutang : Input",0);
		
		try
		{
			uses("portalui_saiCBBL");
			this.e0 = new portalui_saiLabelEdit(this);
			this.e0.setLeft(20);
			this.e0.setTop(10);
			this.e0.setWidth(200);
			this.e0.setCaption("No Bukti");
			this.e0.setText("");
			this.e0.setReadOnly(false);			
			this.e0.setLabelWidth(100);					
			
			this.bGenerate = new portalui_button(this);
			this.bGenerate.setTop(10);
			this.bGenerate.setLeft(230);
			this.bGenerate.setCaption("Generate");
			this.bGenerate.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bGenerate.onClick.set(this,"doGenerate");		
			
			this.l1 = new portalui_label(this);
			this.l1.setLeft(20);
			this.l1.setTop(35);
			this.l1.setHeight(18);
			this.l1.setWidth(100);
			this.l1.setCaption("Tanggal");			
			this.l1.setUnderLine(true);
			
			uses("portalui_datePicker");
			this.dpTgl = new portalui_datePicker(this);
			this.dpTgl.setTop(35);
			this.dpTgl.setLeft(120);
			this.dpTgl.setWidth(100);		
			this.dpTgl.onSelect.set(this,"doSelectDate");
			
			this.ePeriode = new portalui_saiLabelEdit(this);
			this.ePeriode.setLeft(20);
			this.ePeriode.setTop(60);
			this.ePeriode.setWidth(150);
			this.ePeriode.setCaption("Periode");
			this.ePeriode.setText(this.app._periode);		
			this.ePeriode.setReadOnly(true);
			
			this.eKeterangan = new portalui_saiLabelEdit(this);
			this.eKeterangan.setLeft(20);
			this.eKeterangan.setTop(85);
			this.eKeterangan.setWidth(600);
			this.eKeterangan.setCaption("Keterangan");
			this.eKeterangan.setText("");					
			
			this.bLoad = new portalui_button(this);
			this.bLoad.setTop(85);
			this.bLoad.setLeft(760);
			this.bLoad.setCaption("Load Data");
			this.bLoad.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bLoad.onClick.set(this,"doGenerate");		
			
			this.bJurnal = new portalui_button(this);
			this.bJurnal.setTop(85);
			this.bJurnal.setLeft(840);
			this.bJurnal.setCaption("Lihat Jurnal");
			this.bJurnal.setIcon("url(icon/"+system.getThemes()+"/process.png)");
			this.bJurnal.onClick.set(this,"doGenerate");		
			
			uses("portalui_saiGrid");
			this.sg1 = new portalui_saiGrid(this);
			this.sg1.setTop(110);
			this.sg1.setLeft(20);
			this.sg1.setWidth(900);
			this.sg1.setHeight(350);			
			this.sg1.setColCount(21);
			this.sg1.setColTitle(new Array('FLAG','No Invoice','NPM','Nama Mhs','Kode Ang','Semester','Periode','Nilai BPP','Nilai Bayar','Saldo','Umur','Persen','Nilai BD','Akun Beban','Akun Deprs','Kode DRK','Kode PP','BD Sebelumnya','Periode Sblm','Drk Pdpt','No Susut Sblm'));
			
			uses("portalui_sgNavigator");
			this.sgn = new portalui_sgNavigator(this);
			this.sgn.setTop(461);
			this.sgn.setLeft(20);
			this.sgn.setWidth(900);
			this.sgn.setButtonStyle(3);
			this.sgn.setGrid(this.sg1);
			this.sgn.onPager.set(this, "doSelectedPage");			
			this.sgn.setTotalPage(1);
			
			this.eTotal = new portalui_saiLabelEdit(this.sgn);
			this.eTotal.setTop(1);
			this.eTotal.setLeft(670);
			this.eTotal.setWidth(200);			
			this.eTotal.setAlignment(alRight);
			this.eTotal.setTipeText(ttNilai);
			this.eTotal.setReadOnly(true);			
			this.eTotal.setCaption("Total");
			
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();
		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.dtJurnal = new portalui_arrayMap();
			this.dtJurnal2 = new portalui_arrayMap();
			this.sg1.onChange.set(this,"doSGChange");
			this.rearrangeChild(10,23);
			for (var i=1;i <= 20;i++)
				this.sg1.columns.get(i).setReadOnly(true);
			this.dpTgl.setDateString(new Date().getDateStr());
		}catch(e)
		{
			alert("[app_saku_piutang_transaksi_fBadDebMhs]->constructor : "+e);
		}
	}
};
window.app_saku_piutang_transaksi_fBadDebMhs.extend(window.portalui_childForm);
window.app_saku_piutang_transaksi_fBadDebMhs.prototype.mainButtonClick = function(sender)
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
window.app_saku_piutang_transaksi_fBadDebMhs.prototype.doModalResult = function(event, modalResult)
{
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
				}
				catch(e)
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
window.app_saku_piutang_transaksi_fBadDebMhs.prototype.insertData = function(sql)
{	
	var line;	
	var script2="", script1 = "insert into ar_susut(no_susut, tanggal, keterangan, periode, ref1, nilai, kode_lokasi, akun_beban, akun_deprs, kode_pp, p_susut,status, posted, susut_sblm, ref2, nilai_bayar, kode_drk, prd_sblm, drk_pdpt) values";	
	var scriptJurnal = "insert into armhs_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) values ";
	var inv = new Array();	
	var urut = -1;
	if (this.app._dbEng == "mysqlt"){
		for (var i in this.sg1.data.rows)
		{
			if (this.sg1.cells(0,i) == "TRUE"){
				line = this.sg1.data.rows[i];
				urut++;
				if (urut > 0) {script1 += ",";}
				script1 += "('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"','"+this.ePeriode.getText()+"','"+line.no_invoice+"',"+
						" '"+parseFloat(line.nilai_bd)+"','"+this.app._lokasi+"','"+line.akun_beban+"','"+line.akun_deprs+"','"+line.kode_pp+"', "+
						" '"+line.persen+"','-','F',"+line.bd_sblm+",'"+line.nosblm+"',"+line.total_bayar+",'"+line.kode_drk_beban+"','"+line.prdsblm+"','"+line.kode_drk_pdpt+"')";
				sql.add("update armhs_m set nilai_bd = nilai_bd + "+parseFloat(line.nilai_bd)+" where kode_lokasi = '"+this.app._lokasi+"' and no_invoice = '"+line.no_invoice+"'");
			}
		}		
		var urut=-1;
		for (var i in this.dtJurnal.objList){
			line = this.dtJurnal.get(i);						
			if (line.get("dc") =="D"){
				urut++;
				if (urut >0) {scriptJurnal += ",";}
				scriptJurnal+="('"+this.e0.getText()+"','"+this.e0.getText()+"','"+urut+"','"+this.dpTgl.getText()+"','"+line.get("kode_akun")+"' "+
					",'"+line.get("dc")+"','"+line.get("keterangan")+"','"+parseFloat(line.get("nilai"))+"','AR','AR_BD','"+this.ePeriode.getText()+"' "+
					",'"+this.app._userLog+"',now(),'"+this.app._lokasi+"','-','IDR',1,'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"')";
			}
		}
		for (var i in this.dtJurnal.objList){
			line = this.dtJurnal.get(i);						
			if (line.get("dc") =="C"){
				urut++;
				if (urut >0) {scriptJurnal += ",";}
				scriptJurnal+=" ('"+this.e0.getText()+"','"+this.e0.getText()+"','"+urut+"','"+this.dpTgl.getText()+"','"+line.get("kode_akun")+"' "+
					",'"+line.get("dc")+"','"+line.get("keterangan")+"','"+parseFloat(line.get("nilai"))+"','AR','AR_BD','"+this.ePeriode.getText()+"' "+
					",'"+this.app._userLog+"',now(),'"+this.app._lokasi+"','-','IDR',1,'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"')";
			}
		}
		//--------------------------- jurnal reklas 		
		for (var i in this.dtJurnal2.objList){
			line = this.dtJurnal2.get(i);						
			if (line.get("dc") =="D"){
				urut++;
				if (urut >0) {scriptJurnal += ",";}
				scriptJurnal+="('"+this.e0.getText()+"','"+this.e0.getText()+"','"+urut+"','"+this.dpTgl.getText()+"','"+line.get("kode_akun")+"' "+
					",'"+line.get("dc")+"','"+line.get("keterangan")+"','"+parseFloat(line.get("nilai"))+"','AR','AR_BDR','"+this.ePeriode.getText()+"' "+
					",'"+this.app._userLog+"',now(),'"+this.app._lokasi+"','-','IDR',1,'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"')";
			}
		}
		for (var i in this.dtJurnal2.objList){
			line = this.dtJurnal2.get(i);						
			if (line.get("dc") =="C"){
				urut++;
				if (urut >0) {scriptJurnal += ",";}
				scriptJurnal+=" ('"+this.e0.getText()+"','"+this.e0.getText()+"','"+urut+"','"+this.dpTgl.getText()+"','"+line.get("kode_akun")+"' "+
					",'"+line.get("dc")+"','"+line.get("keterangan")+"','"+parseFloat(line.get("nilai"))+"','AR','AR_BDR','"+this.ePeriode.getText()+"' "+
					",'"+this.app._userLog+"',now(),'"+this.app._lokasi+"','-','IDR',1,'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"')";
			}
		}		
		sql.add(script1);	
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
window.app_saku_piutang_transaksi_fBadDebMhs.prototype.FindBtnClick = function(sender, event)
{	
};
window.app_saku_piutang_transaksi_fBadDebMhs.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_saku_piutang_transaksi_fBadDebMhs.prototype.doGenerate = function(sender)
{
	try{
		if(sender == this.bGenerate)
			this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "ar_susut", "no_susut", "BD"+this.ePeriode.getText().substr(2),"000", " and kode_lokasi = '"+this.app._lokasi+"' "));	
		if (sender == this.bLoad){
			var isnull = this.app._dbEng == "mysqlt" ? "ifnull" : "isnull";
			var limitmySQL = this.app._dbEng == "mysqlt" ? "limit 0,1" : "";
			var limitmsSQL = this.app._dbEng == "mysqlt" ? "" : "top 1";
			this.dbLib.execQuerySync("delete from tmp_arbyr where kode_lokasi ='"+this.app._lokasi+"' and idgen='"+this.app._userSession+"' ");
			this.dbLib.execQuerySync("insert into tmp_arbyr select ref2, kode_produk, sum(case when substring(akun_piutang,1,1) = '1' then x.nilai + x.disc else -x.nilai + x.disc end) as total_byr,z.kode_lokasi, '"+this.app._userSession+"' from arbyrmhs_d x inner join arbyrmhs_m z on z.no_bukti = x.no_bukti and z.kode_lokasi = x.kode_lokasi and z.kode_lokasi = '"+this.app._lokasi+"' group by ref2, kode_produk");
			var rs = this.dbLib.getDataProvider("select 'FALSE' as flag, a.no_invoice,"+
	                               "d.NPM,d.nama_mhs,d.kode_ang,a.semester,c.periode,sum(a.nilai * a.jumlah) as nilai_bpp,"+
								   " sum("+isnull+"(g.total_byr,0)) as total_bayar, sum(a.nilai * a.jumlah) - sum("+isnull+"(g.total_byr,0)) as saldo,"+
								   " PERIOD_DIFF("+this.ePeriode.getText()+",c.periode) as umur, "+
								   " case when PERIOD_DIFF("+this.ePeriode.getText()+",c.periode) <= 6 then 0 "+
								   "	  when PERIOD_DIFF("+this.ePeriode.getText()+",c.periode) > 12 then 1.0 "+
								   "	  when PERIOD_DIFF("+this.ePeriode.getText()+",c.periode) > 6 then 0.5 end as persen, "+
								   " case when PERIOD_DIFF("+this.ePeriode.getText()+",c.periode) <= 6 then 0 "+
								   "	  when PERIOD_DIFF("+this.ePeriode.getText()+",c.periode) > 12 then 1.0 "+
								   "	  when PERIOD_DIFF("+this.ePeriode.getText()+",c.periode) > 6 then 0.5 "+
								   " end 	* sum(a.nilai * a.jumlah) as nilai_bd,"+
								   " case when "+isnull+"(h.periode,'-') <> '-' and substring("+isnull+"(h.periode,'-'),1,4) <> substring('"+this.ePeriode.getText()+"',1,4) then a.akun_pdpt else  b.beban_susut end as akun_beban,b.akun_deprs,b.kode_drk_beban, "+                               
	                               " e.kode_proyek as kode_pp, "+isnull+"(h.nilai, 0) as bd_sblm,"+isnull+"(h.periode,'-') as prdSblm, b.kode_drk_pdpt, "+isnull+"(h.no_susut,'-') as noSblm  "+
	                               "from armhs_d a inner join produk b on a.kode_produk=b.kode_produk  and b.kode_lokasi = a.kode_lokasi "+
								   "	inner join armhs_m c on a.no_invoice=c.no_invoice and c.kode_lokasi = a.kode_lokasi "+								   
								   "	inner join mhs d on c.ref1=d.npm and d.kode_lokasi = a.kode_lokasi "+
								   "	inner join jurusan e on d.kode_jur=e.kode_jur and e.kode_lokasi = a.kode_lokasi "+
								   "   	inner join param_bpp f on f.kode_produk=b.kode_produk and f.kode_ang=d.kode_ang and f.kode_jur=d.kode_jur and f.semester = a.semester and f.kode_lokasi = a.kode_lokasi "+
								   "	left outer join (select no_susut, ref1, akun_deprs, nilai, periode from ar_susut where kode_lokasi = '"+this.app._lokasi+"' and periode <= '"+this.ePeriode.getText()+"' order by tanggal) h on h.ref1 = a.no_invoice and h.periode = (select max(periode) from ar_susut zz where zz.kode_lokasi = '"+this.app._lokasi+"' and zz.periode <= '"+this.ePeriode.getText()+"' and zz.ref1 = a.no_invoice) "+
								   "    left outer join tmp_arbyr g on g.no_invoice = a.no_invoice and g.kode_produk = b.kode_produk and g.idgen = '"+this.app._userSession+"' and g.kode_lokasi = '"+this.app._lokasi+"' "+
	                               "where  a.kode_lokasi = '"+this.app._lokasi+"' and substring(a.akun_piutang,1,1) = '1' and "+
	                               " c.flag_hapus='0' and c.periode <= '"+this.ePeriode.getText()+"' and "+isnull+"(h.periode,'-') < '"+this.ePeriode.getText()+"' "+
								   " and PERIOD_DIFF("+this.ePeriode.getText()+",c.periode)	> 0 "+		
								   " group by a.no_invoice,d.npm,d.nama_mhs,d.kode_ang,a.semester,c.periode,a.akun_pdpt,"+
								   " b.beban_susut,b.akun_deprs,b.kode_drk_beban,e.kode_proyek, h.nilai, h.periode, b.kode_drk_pdpt, h.no_susut "+
								   " having sum("+isnull+"(g.total_byr,0)) < sum(a.nilai * a.jumlah) "+
	                               "order by d.kode_ang,d.npm",true);								
		   if (typeof rs != "string"){
				this.sg1.clear();
				for (var i in rs.rs.rows){
					rs.rs.rows[i].flag = rs.rs.rows[i].flag.toUpperCase();				
				}
				var row;
				this.sg1.data = rs.rs;    
				this.sg1.setData(rs);
				this.sg1.columns.get(0).setColumnFormat(cfBoolean);
				for (var i=1;i <= 20;i++)
					this.sg1.columns.get(i).setReadOnly(true);
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
	}catch(e){
		system.alert(this,e,"");
	}
};
window.app_saku_piutang_transaksi_fBadDebMhs.prototype.doSelectDate = function(sender, y,m,d)
{
	this.ePeriode.setText(y+""+(m < 10?'0'+m:m));
	this.bGenerate.click();
};
window.app_saku_piutang_transaksi_fBadDebMhs.prototype.createJurnal = function()
{
	try{
		var dtJurnal = new portalui_arrayMap();	
		var dtJurnal2 = new portalui_arrayMap();	
		var nemu, kdAkun, akunPdpt, kdPP, kdDrk,row;
//----------------------------------- buffering Akun	
		var row, ix, dtJrnl = -1,bufferAkun= new Array(), tmp = this.dbLib.loadQuery("select kode_akun, nama from masakun where kode_lokasi = '"+this.app._lokasi+"' ");		
		tmp = tmp.split("\r\n");
		for (var i in tmp){	
			row = tmp[i].split(";");
			if (i > 0)
				bufferAkun[row[0]] = row[1];
		}		
//----------------------------------- end buffering Akun	
	    var line, total = 0;
		for (var i in this.sg1.data.rows){
			if (this.sg1.cells(0,i).toUpperCase() == "TRUE"){
				line = this.sg1.data.rows[i];
				kdAkun = line.akun_beban;			
				kdPP = line.kode_pp;
				kdDrk = line.kode_drk_beban;
				nemu = false;
				ix = 0;
				total+= parseFloat(line.nilai_bd);
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
					row.set("keterangan","Jurnal Penyisihan "+ this.e0.getText()+" "+line.no_invoice);
					row.set("nilai",parseFloat(line.nilai_bd));
					row.set("kode_pp",kdPP);
					row.set("kode_drk",kdDrk);
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else {
					dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(line.nilai_bd));				
					dtJurnal.get(ix).set("keterangan",row.get("keterangan")+" "+line.no_invoice);
				}
				ix = -1;
				kdAkun = line.akun_deprs;
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
					row.set("keterangan","Jurnal PDD "+ this.e0.getText()+" "+line.no_invoice);
					row.set("nilai",parseFloat(line.nilai_bd));
					row.set("kode_pp",kdPP);
					row.set("kode_drk",kdDrk);
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else {				
					dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(line.nilai_bd));				
					dtJurnal.get(ix).set("keterangan",row.get("keterangan")+" "+line.no_invoice);
				}
//---------------------------------------------------- reklas jurnal baddebt sblmnya						
				if (line.get("bd_sblm") != 0) {
					kdAkun = line.akun_deprs;
					for (var j in dtJurnal2.objList){		
					  if (kdAkun == dtJurnal2.get(j).get("kode_akun") && kdPP == dtJurnal2.get(j).get("kode_pp") && kdDrk == dtJurnal2.get(j).get("kode_drk")){
						nemu = true;
						row = dtJurnal2.get(j);
						ix = j;
						break;
					  }
					}
					if (!nemu){
						row = new portalui_arrayMap();
						row.set("kode_akun",kdAkun);
						row.set("nama",bufferAkun[kdAkun]);
						row.set("dc","D");
						row.set("keterangan","Jurnal Reklas Penyisihan Sebelum "+ this.e0.getText()+" "+line.no_invoice);
						row.set("nilai",parseFloat(line.bd_sblm));
						row.set("kode_pp",kdPP);
						row.set("kode_drk",kdDrk);
						dtJrnl++;
						dtJurnal2.set(dtJrnl,row);						
					}else {
						dtJurnal2.get(ix).set("nilai",row.get("nilai") + parseFloat(line.bd_sblm));				
						dtJurnal2.get(ix).set("keterangan",row.get("keterangan")+" "+line.no_invoice);
					}
					ix = -1;
					kdAkun = line.akun_beban;
					for (var j in dtJurnal2.objList){		
					  if (kdAkun == dtJurnal2.get(j).get("kode_akun") && kdPP == dtJurnal2.get(j).get("kode_pp") && kdDrk == dtJurnal2.get(j).get("kode_drk")){
						nemu = true;
						row = dtJurnal2.get(j);
						ix = j;
						break;
					  }
					}
					if (!nemu){
						row = new portalui_arrayMap();
						row.set("kode_akun",kdAkun);
						row.set("nama",bufferAkun[kdAkun]);
						row.set("dc","C");
						row.set("keterangan","Jurnal Reklas Penyisihan Sebelum "+ this.e0.getText() +" "+line.no_invoice);
						row.set("nilai",parseFloat(line.bd_sblm));
						row.set("kode_pp",kdPP);
						row.set("kode_drk",kdDrk);
						dtJrnl++;
						dtJurnal2.set(dtJrnl,row);						
					}else {				
						dtJurnal2.get(ix).set("nilai",row.get("nilai") + parseFloat(line.bd_sblm));				
						dtJurnal2.get(ix).set("keterangan",row.get("keterangan")+" "+line.no_invoice);
					}	
				}
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
		dtJurnal2.setTag2(dataDesc);
		this.dtJurnal = dtJurnal;
		this.dtJurnal2 = dtJurnal2;
		this.eTotal.setText(floatToNilai(total));
	}catch(e){
		//alert(e);
	}
};
window.app_saku_piutang_transaksi_fBadDebMhs.prototype.doSGChange = function(sender, col, row)
{
	if (col == 0){
		this.createJurnal();
	}
};
