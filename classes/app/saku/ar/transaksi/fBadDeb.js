window.app_saku_ar_transaksi_fBadDeb = function(owner)
{
  if (owner)
	{
		window.app_saku_ar_transaksi_fBadDeb.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_ar_transaksi_fBadDeb";
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
			this.sg1.setColCount(18);
			this.sg1.setColTitle(new Array('FLAG','No Invoice','Kode Cust','Nama','Periode','Nilai Piutang','Nilai Bayar','Saldo','Umur','Persen','Nilai BD','Akun Beban','Akun Deprs','Kode DRK','Kode PP','BD Sebelumnya','Periode Sblm','Drk Pdpt','No Susut Sblm'));
			
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
			this.dpTgl.setDateString((new Date).getDateStr());	
			this.rearrangeChild(10,23);
		}catch(e)
		{
			alert("[app_saku_ar_transaksi_fBadDeb]->constructor : "+e);
		}
	}
};
window.app_saku_ar_transaksi_fBadDeb.extend(window.portalui_childForm);
window.app_saku_ar_transaksi_fBadDeb.prototype.mainButtonClick = function(sender)
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
window.app_saku_ar_transaksi_fBadDeb.prototype.doModalResult = function(event, modalResult)
{
	switch (event)
	{
		case "clear" :
			if (modalResult == mrOk)
			{
				this.standarLib.clearByTag(this, new Array("0"),this.e0);				
				this.sg1.clear();
			}
			break;
		case "simpan" :
			if (modalResult == mrOk &&(this.standarLib.checkEmptyByTag(this, new Array("0"))))
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
window.app_saku_ar_transaksi_fBadDeb.prototype.insertData = function(sql)
{	
	var line;	
	var script2="", script1 = "insert into ar_susut(no_susut, tanggal, keterangan, periode, ref1, nilai, kode_lokasi, akun_beban, akun_deprs, kode_pp, p_susut,status, posted, susut_sblm, ref2, nilai_bayar, kode_drk, prd_sblm, drk_pdpt) values";	
	var scriptJurnal = "insert into ar_j(no_bukti,no_dokumen, no_urut, tanggal, kode_akun, dc, keterangan, nilai,modul, jenis, periode,nik_user, tgl_input, kode_lokasi, ref1, kode_curr, kurs, kode_pp, kode_drk) values ";
	var inv = new Array();	
	var urut = -1;
	if (this.app._dbEng == "mysqlt"){
		for (var i in this.sg1.data.objList)
		{
			if (this.sg1.cells(0,i) == "TRUE"){
				line = this.sg1.data.get(i);
				urut++;
				if (urut > 0) {script1 += ",";}
				script1 += "('"+this.e0.getText()+"','"+this.dpTgl.getDateString()+"','"+this.eKeterangan.getText()+"','"+this.ePeriode.getText()+"','"+line.get("no_invoice")+"',"+
						" '"+parseFloat(line.get("nilai_bd"))+"','"+this.app._lokasi+"','"+line.get("akun_beban")+"','"+line.get("akun_deprs")+"','"+line.get("kode_pp")+"', "+
						" '"+line.get("persen")+"','-','F',"+line.get("bd_sblm")+",'"+line.get("noSblm")+"',"+line.get("total_bayar")+",'"+line.get("kode_drk_beban")+"','"+line.get("prdsblm")+"','"+line.get("kode_drk_pdpt")+"')";
				sql.add("update ar_inv set nilai_bd = nilai_bd + "+parseFloat(line.get("nilai_bd"))+" where kode_lokasi = '"+this.app._lokasi+"' and no_invoice = '"+line.get("no_invoice")+"'");
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
					",'"+line.get("dc")+"','"+line.get("keterangan")+"','"+parseFloat(line.get("nilai"))+"','AR','AR_BD','"+this.ePeriode.getText()+"' "+
					",'"+this.app._userLog+"',now(),'"+this.app._lokasi+"','-','IDR',1,'"+line.get("kode_pp")+"','"+line.get("kode_drk")+"')";
			}
		}
		for (var i in this.dtJurnal2.objList){
			line = this.dtJurnal2.get(i);						
			if (line.get("dc") =="C"){
				urut++;
				if (urut >0) {scriptJurnal += ",";}
				scriptJurnal+=" ('"+this.e0.getText()+"','"+this.e0.getText()+"','"+urut+"','"+this.dpTgl.getText()+"','"+line.get("kode_akun")+"' "+
					",'"+line.get("dc")+"','"+line.get("keterangan")+"','"+parseFloat(line.get("nilai"))+"','AR','AR_BD','"+this.ePeriode.getText()+"' "+
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
window.app_saku_ar_transaksi_fBadDeb.prototype.FindBtnClick = function(sender, event)
{	
};
window.app_saku_ar_transaksi_fBadDeb.prototype.doRequestReady = function(sender, methodName, result)
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
window.app_saku_ar_transaksi_fBadDeb.prototype.doGenerate = function(sender)
{
	try{
		if(sender == this.bGenerate)
			this.e0.setText(this.standarLib.noBuktiOtomatis(this.dbLib, "ar_susut", "no_susut", "BD"+this.ePeriode.getText().substr(2),"000", " and kode_lokasi = '"+this.app._lokasi+"' "));	
		if (sender == this.bLoad){
			var isnull = this.app._dbEng == "mysqlt" ? "ifnull" : "isnull";
			var limitmySQL = this.app._dbEng == "mysqlt" ? "limit 0,1" : "";
			var limitmsSQL = this.app._dbEng == "mysqlt" ? "" : "top 1";
			
			var rs = this.dbLib.runSQL("select 'FALSE' as flag, a.no_invoice,"+
	                               "	b.kode_cust, d.nama,a.periode,a.nilai + a.nilai_ppn as nilai_tagihan,"+
								   " "+isnull+"(g.total_byr,0) as total_bayar, (a.nilai + a.nilai_ppn) - "+isnull+"(g.total_byr,0) as saldo,"+
								   " PERIOD_DIFF("+this.ePeriode.getText()+",a.periode) as umur, "+
								   " case when PERIOD_DIFF("+this.ePeriode.getText()+",a.periode) <= 6 then 0 "+
								   "	  when PERIOD_DIFF("+this.ePeriode.getText()+",a.periode) > 12 then 1 "+
								   "	  when PERIOD_DIFF("+this.ePeriode.getText()+",a.periode) > 6 then 0.5 end as persen, "+
								   " case when PERIOD_DIFF("+this.ePeriode.getText()+",a.periode) <= 6 then 0 "+
								   "	  when PERIOD_DIFF("+this.ePeriode.getText()+",a.periode) > 12 then 1 "+
								   "	  when PERIOD_DIFF("+this.ePeriode.getText()+",a.periode) > 6 then 0.5 "+
								   " end 	* (a.nilai + a.nilai_ppn) as nilai_bd,"+
								   " case when "+isnull+"(h.periode,'-') <> '-' and substring("+isnull+"(h.periode,'-'),1,4) <> substring('"+this.ePeriode.getText()+"',1,4) then b.akun_pdpt else b.akun_beban end as akun_beban,b.akun_deprs, b.kode_drk_beban, "+                               
	                               " a.kode_pp, "+isnull+"(h.nilai, 0) as bd_sblm,"+isnull+"(h.periode,'-') as prdSblm, '-' as kode_drk_pdpt, "+isnull+"(h.no_susut,'-') as noSblm  "+
	                               "from ar_inv a inner join ar_kontrak b on a.no_kontrak=b.no_kontrak and b.kode_lokasi = a.kode_lokasi "+								   								   								   
								   "	inner join cust d on d.kode_cust= b.kode_cust and d.kode_lokasi = a.kode_lokasi "+
								   "	left outer join (select "+limitmsSQL+" no_susut, ref1, akun_deprs, nilai, periode from ar_susut where kode_lokasi = '"+this.app._lokasi+"' and periode <= '"+this.ePeriode.getText()+"' order by tanggal "+limitmySQL+")h on h.ref1 = a.no_invoice "+
								   " left outer join (select ref1, sum(z.nilai + z.nilai_pph) as total_byr from arbyr_m z where z.kode_lokasi = '"+this.app._lokasi+"' group by ref1) g on g.ref1 = a.no_invoice "+
	                               "where  a.kode_lokasi = '"+this.app._lokasi+"' and "+
	                               ""+isnull+"(g.total_byr,0) < a.nilai + a.nilai_ppn and a.periode <= '"+this.ePeriode.getText()+"' "+
								   " and PERIOD_DIFF("+this.ePeriode.getText()+",a.periode)	> 0 "+		
	                               "order by b.kode_cust");					
		   if (rs instanceof portalui_arrayMap){
				this.sg1.clear();
				for (var i in rs.objList){
					rs.get(i).set("flag",rs.get(i).get("flag").toUpperCase());				
				}
				var row;
				this.sg1.setData(rs);
				this.sg1.columns.get(0).setButtonStyle(window.bsAuto);
				var val = new portalui_arrayMap();
				    val.set(1, "TRUE");
					val.set(2, "FALSE");	
				this.sg1.columns.get(0).setPicklist(val);
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
window.app_saku_ar_transaksi_fBadDeb.prototype.doSelectDate = function(sender, y,m,d)
{
	this.ePeriode.setText(y+""+(m < 10?'0'+m:m));
	this.bGenerate.click();
};
window.app_saku_ar_transaksi_fBadDeb.prototype.createJurnal = function()
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
		for (var i in this.sg1.data.objList){
			if (this.sg1.cells(0,i).toUpperCase() == "TRUE"){
				line = this.sg1.data.get(i);
				kdAkun = this.sg1.data.get(i).get("akun_beban");			
				kdPP = this.sg1.data.get(i).get("kode_pp");
				kdDrk = this.sg1.data.get(i).get("kode_drk_beban");
				nemu = false;
				ix = 0;
				total+= parseFloat(this.sg1.data.get(i).get("nilai_bd"));
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
					row.set("keterangan","Jurnal Penyisihan "+ this.e0.getText());
					row.set("nilai",parseFloat(this.sg1.data.get(i).get("nilai_bd")));
					row.set("kode_pp",kdPP);
					row.set("kode_drk",kdDrk);
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else {
					dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(this.sg1.data.get(i).get("nilai_bd")));				
				}
				ix = -1;
				kdAkun = this.sg1.data.get(i).get("akun_deprs");
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
					row.set("nilai",parseFloat(this.sg1.data.get(i).get("nilai_bd")));
					row.set("kode_pp",kdPP);
					row.set("kode_drk",kdDrk);
					dtJrnl++;
					dtJurnal.set(dtJrnl,row);						
				}else {				
					dtJurnal.get(ix).set("nilai",row.get("nilai") + parseFloat(this.sg1.data.get(i).get("nilai_bd")));				
				}
//---------------------------------------------------- reklas jurnal baddebt sblmnya						
				if (line.get("bd_sblm") != 0) {
					kdAkun = this.sg1.data.get(i).get("akun_deprs");
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
						row.set("keterangan","Jurnal Reklas Penyisihan Sebelum "+ this.e0.getText());
						row.set("nilai",parseFloat(this.sg1.data.get(i).get("bd_sblm")));
						row.set("kode_pp",kdPP);
						row.set("kode_drk",kdDrk);
						dtJrnl++;
						dtJurnal2.set(dtJrnl,row);						
					}else {
						dtJurnal2.get(ix).set("nilai",row.get("nilai") + parseFloat(this.sg1.data.get(i).get("bd_sblm")));				
					}
					ix = -1;
					kdAkun = this.sg1.data.get(i).get("akun_beban");
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
						row.set("keterangan","Jurnal Reklas Penyisihan Sebelum"+ this.e0.getText());
						row.set("nilai",parseFloat(this.sg1.data.get(i).get("bd_sblm")));
						row.set("kode_pp",kdPP);
						row.set("kode_drk",kdDrk);
						dtJrnl++;
						dtJurnal2.set(dtJrnl,row);						
					}else {				
						dtJurnal2.get(ix).set("nilai",row.get("nilai") + parseFloat(this.sg1.data.get(i).get("bd_sblm")));				
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
window.app_saku_ar_transaksi_fBadDeb.prototype.doSGChange = function(sender, col, row)
{
	if (col == 0){
		this.createJurnal();
	}
};