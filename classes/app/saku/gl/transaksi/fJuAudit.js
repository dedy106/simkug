/**
 * @author dweexfuad
 */
window.app_saku_gl_transaksi_fJuAudit = function(owner)
{
	if (owner)
	{
		window.app_saku_gl_transaksi_fJuAudit.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_gl_transaksi_fJuAudit";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal Audit : Input", 0);	
		try{
		uses("portalui_saiCBBL;portalui_label;portalui_datePicker;portalui_saiGrid;util_addOnLib;app_saku_fJurnalViewer");		
		this.ed_period = new portalui_saiCB(this, {
			bound: [20, 20, 182, 20],
			caption: "Periode"
		});		
		this.lblTgl1 = new portalui_label(this, {
			bound: [20, 32, 101, 20],
			caption: "Tanggal",
			underline: true
		});		
		
		this.dp_tgl1 = new portalui_datePicker(this, {
			bound: [120, 32, 82, 18]
		});			
        this.cb_jenis = new portalui_saiCB(this, {
			bound: [20, 56, 185, 20],
			caption: "Jenis",
			tag: 1,
			items: ["AUDIT", "ADJUST"]
		});
		
		this.ed_nb = new portalui_saiLabelEdit(this, {
			bound: [20, 78, 230, 20],
			caption: "No Bukti JU",
			readOnly: true
		});		
	
		this.bGen = new portalui_button(this, {
			bound: [256, 78, 80, 20],
			caption: "Generate",
			icon: "url(icon/" + system.getThemes() + "/process.png)"
		});		
	    
		this.cb_bukti = new portalui_saiCBBL(this, {
			bound: [700, 78, 205, 20],
			caption: "No JU Referensi",
			readOnly: true,
			tag: 9
		});
			
		this.bShow = new portalui_imageButton(this, {
			bound: [902, 78, 22, 22],
			hint: "Load Data",
			image: "icon/" + system.getThemes() + "/reload.png"
		});
		this.ed_dok = new portalui_saiLabelEdit(this, {
			bound: [20, 100, 310, 20],
			caption: "No Dokumen"
		});		
		
		this.ed_desc = new portalui_saiLabelEdit(this, {
			bound: [20, 122, 500, 20],
			caption: "Deskripsi",
			maxLength: 150,
			tag: 1
		});				
		this.cb_curr = new portalui_saiCBBL(this, {
			bound: [20, 144, 185, 20],
			caption: "Currency dan Kurs",
			text: "IDR",
			tag: 9,
			rightLabelVisible: false
		});				
		this.ed_kurs = new portalui_saiLabelEdit(this, {
			bound: [205, 144, 45, 20],
			caption: "",
			labelWidth: 0,
			tipeText: ttNilai,
			alignment: alRight,
			readOnly: true,
			text: "1",
			tag: 1
		});		
		this.cb_pembuat = new portalui_saiCBBL(this, {
			bound: [20, 166, 185, 20],
			caption: "Dibuat Oleh",
			multiSelection:false,
			sql:["select nik, nama from karyawan where kode_lokasi = '"+this.app._lokasi+"'", ["nik","nama"],false, ["NIK","Nama"],"and", "Daftar Karyawan",true]
		});		
		this.ed_debet = new portalui_saiLabelEdit(this, {
			bound: [680, 166, 220, 20],
			caption: "Total Debet",
			tipeText: ttNilai,
			alignment: alRight,
			text: "0",
			readOnly: true
		});
		this.cb_setuju = new portalui_saiCBBL(this, {
			bound: [20, 188, 185, 20],
			caption: "Disetujui Oleh",
			multiSelection: false,
			sql: ["select nik, nama from karyawan where kode_lokasi = '" + this.app._lokasi + "'", ["nik", "nama"], false, ["NIK", "Nama"], "and", "Daftar Karyawan", true]
		});					
		this.ed_kredit = new portalui_saiLabelEdit(this, {
			bound: [680, 188, 220, 20],
			caption: "Total Kredit",
			tipeText: ttNilai,
			alignment: alRight,
			text: "0",
			readOnly: true
		});		 
		
		this.bGar = new portalui_imageButton(this, {
			bound: [900, 188, 22, 22],
			hint: "Hitung Anggaran",
			image: "icon/" + system.getThemes() + "/tabCont2.png"
		});		
	
		this.p1 = new portalui_panel(this, {
			bound: [20, 210, 900, 260],
			caption: "Daftar Item Jurnal Transaksi"
		});	    
		    	         
    	this.sg1 = new portalui_saiGrid(this.p1, {
			bound: [1, 20, 895, 210],
			colCount: 9,
			colTitle: ["Kode Akun", "Nama Akun", "Keterangan", "DC", "Nilai", "Kode PP", "Nama PP", "Kode RKM", "Nama RKM"],
			colWidth:[[8,7,6,5,4,3,2,1,0],[180,80,100,80,120,30,250,120,80]],			
			buttonStyle:[[0,3,5,7],[bsEllips, bsAuto, bsEllips, bsEllips]],
			colReadOnly:[true,[1,6,8],[]],
			picklist:[[3],[new portalui_arrayMap({items:["D","C"]})]],
			colFormat:[[4,3],[cfNilai,cfHurufBesar]]
		});    		
		this.sgn = new portalui_sgNavigator(this.p1, {
			bound: [1, 234, 899, 25],
			grid: this.sg1,
			buttonStyle: 2
		});			
		this.rearrangeChild(10,23);
		setTipeButton(tbSimpan);
		this.setTabChildIndex();
				    
			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);		   
		    this.standarLib = new util_standar();		    									
			this.addOnLib = new util_addOnLib();					
			this.jurnal = new app_saku_fJurnalViewer(this.app);
			this.jurnal.sg.setColTitle(new Array("Kode Akun","Kode PP","Kode RKM","Nilai","Saldo Anggaran"));
			this.jurnal.p.setCaption('Data Anggaran');
			
			this.bShow.onClick.set(this, "showClick");
			this.cb_bukti.onBtnClick.set(this, "FindBtnClick");
			this.ed_period.onChange.set(this, "doEditChange");
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.cb_jenis.onChange.set(this,"doEditChange");
			this.bGen.onClick.set(this, "genClick");
			this.bGar.onClick.set(this, "garClick");
			this.cb_curr.onChange.set(this, "doEditChange");
			this.cb_curr.onBtnClick.set(this, "FindBtnClick");			
			this.sg1.onEllipsClick.set(this, "doFindBtnClick");
			this.sg1.onNilaiChange.set(this, "doNilaiChange");
			this.sg1.onCellExit.set(this, "doCellExit");
			this.sg1.onCellEnter.set(this, "doCellEnter");
		
			this.standarLib.clearByTag(this, new Array("0","1"),this.dp_tgl1);							
			this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
			this.sg1.clear(1);this.ed_kurs.setText("1");
			this.cb_jenis.setText("AUDIT");
			var sql = new server_util_arrayList();
			sql.add("select m.kode_akun, m.nama from masakun m "+
				" inner join flag_relasi b on b.kode_akun = m.kode_akun and m.kode_lokasi = b.kode_lokasi "+
				" where b.kode_flag = '999' and m.kode_lokasi = '"+this.app._lokasi+"' ");
			sql.add("select value1 from spro where kode_lokasi = '"+this.app._lokasi+"' and kode_spro = 'MAXPRD'");
			this.dbLib.getMultiDataProviderA(sql);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_saku_gl_transaksi_fJuAudit.extend(window.portalui_childForm);
window.app_saku_gl_transaksi_fJuAudit.implement({	
	doSelect: function(sender, year, month, day){		
		for (var i=0;i < 4;i++)
			this.ed_period.addItem(i,year.toString()+(13+i).toString());
		this.ed_period.setText(year.toString()+13);
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");		
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");		
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");		
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");
	},
	simpan: function(){	
		//this.hitungGar();
		/*
		for (var i in this.gridJurnal.objList)
		{
			line = this.gridJurnal.get(i);
			if ((line.get("kode_drk") != "-") && (parseFloat(line.get("nilai")) > parseFloat(line.get("saldo_gar"))) && (parseFloat(line.get("nilai"))>0))
			{
				system.alert(this,"Nilai transaksi melebihi saldo anggaran.","Periksa kembali data anggaran.");
				return false;
			}
		}
		*/
		this.bGen.click();
		if (this.standarLib.checkEmptyByTag(this, new Array("0","1")))
		{
			try
			{
				var tgl = new Date();
				perAwal = parseFloat(this.dp_tgl1.getYear())+1;
				uses("server_util_arrayList");
				sql = new server_util_arrayList();
				
				sql.add("insert into ju_m (no_ju,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,"+
						"             periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,posted,no_del,no_link,ref1) values  "+
						"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDateString()+"','"+this.ed_desc.getText()+"','-','JU','"+this.cb_jenis.getText()+"','"+
						     this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+","+parseNilai(this.ed_debet.getText())+",'"+this.cb_pembuat.getText()+"','"+this.cb_setuju.getText()+"',now(),'"+this.app._userLog+"','T','-','-','-')");
				for (var i = 0; i < this.sg1.rows.getLength(); i++) {
					if (this.sg1.cells(0,i).substring(0,1) == '4' || this.sg1.cells(0,i).substring(0,1) == '5' ){
						sql.add("insert into jp(no_bukti, tanggal, periode, keterangan, nik_pembuat, kode_lokasi, nilai, tgl_input, nik_user )values"+
							"('"+this.ed_nb.getText()+"','"+this.dp_tgl1.getDateString()+"','"+(this.dp_tgl1.getYear()+this.maxPeriode)+"','Jurnal JP dari koreksi audit periode "+this.ed_period.getText()+"', "+
							"	'"+this.cb_pembuat.getText()+"','"+this.app._lokasi+"',"+parseNilai(this.ed_debet.getText())+",now(), '"+this.app._userLog+"')");
						break;
					}
				}
				var nu = 0, nu2 = 0;				
				for (var i=0; i < this.sg1.rows.getLength(); i++){			
					if (this.sg1.rowValid(i)){
						nu++;
						sql.add("insert into ju_j (no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,"+
							"kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+	
							"('"+this.ed_nb.getText()+"','"+this.ed_dok.getText()+"','"+this.dp_tgl1.getDate()+"',"+nu+",'"+this.sg1.getCell(0,i)+
							"','"+this.sg1.getCell(2,i)+"','"+this.sg1.getCell(3,i).toUpperCase()+"',"+parseNilai(this.sg1.getCell(4,i))+",'"+this.sg1.getCell(5,i)+"','"+this.sg1.getCell(7,i)+"',"+
							"'-','-','-','-','-','-','"+this.app._lokasi+"','JU','"+this.jenis+"',"+
							"'"+this.ed_period.getText()+"','"+this.cb_curr.getText()+"',"+parseNilai(this.ed_kurs.getText())+
							",'"+this.app._userLog+"',now())");
						sql.add("insert into gldt_h(no_bukti, no_urut, kode_lokasi, no_dokumen, tanggal, kode_akun, dc, nilai, keterangan,  "+
									"	kode_pp, kode_drk, kode_cust, kode_proyek, kode_task, kode_vendor, kode_lokarea, nik, modul, jenis, periode, kode_curr, kurs, nilai_curr, tgl_input, nik_user) values"+
								"('"+this.ed_nb.getText()+"','"+(nu)+"','"+this.app._lokasi+"','"+this.ed_nb.getText()+"','"+this.dp_tgl1.getDateString()+"', "+
									" '"+this.sg1.cells(0,i)+"','"+this.sg1.cells(3,i)+"',"+Math.abs(nilaiToFloat(this.sg1.cells(4,i)))+",'"+this.sg1.cells(2,i)+"', "+
									" '"+this.sg1.cells(5,i)+"','-','-','-','-','-','-','"+this.cb_pembuat.getText()+"','"+this.cb_jenis.getText()+"','-','"+this.ed_period.getText()+"','IDR','1',"+Math.abs(nilaiToFloat(this.sg1.cells(4,i)))+",now(),'"+this.app._userLog+"' )");
						sql.add("update glma set so_akhir = so_akhir "+(this.sg1.cells(3,i) == "D" ? "+":"-")+" "+Math.abs(nilaiToFloat(this.sg1.cells(4,i)))+" where kode_lokasi = '"+this.app._lokasi+"' and kode_akun = '"+this.sg1.cells(0,i)+"' and periode = '"+perAwal+"01' ");
						
						if (this.sg1.cells(0,i).substring(0,1) == '4' || this.sg1.cells(0,i).substring(0,1) == '5' ){
								data="insert into jp_d(no_bukti, kode_lokasi, kode_akun, dc, nilai) values";								
								dc = (this.sg1.cells(3,i)== "D" ? "C" : "D");
								data += "('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"','"+dc+"',"+Math.abs(nilaiToFloat(this.sg1.cells(4,i)))+")";
								sql.add(data);																				
								data ="insert into gldt_h(no_bukti, no_urut, kode_lokasi, no_dokumen, tanggal, kode_akun, dc, nilai, keterangan,  "+
									"	kode_pp, kode_drk, kode_cust, kode_proyek, kode_task, kode_vendor, kode_lokarea, nik, modul, jenis, periode, kode_curr, kurs, nilai_curr, tgl_input, nik_user) values";								
								nu2++;
								data += "('"+this.ed_nb.getText()+"','"+(nu2)+"','"+this.app._lokasi+"','"+this.ed_nb.getText()+"','"+this.dp_tgl1.getDateString()+"', "+
									" '"+this.sg1.cells(0,i)+"','"+dc+"',"+Math.abs(nilaiToFloat(this.sg1.cells(4,i)))+",'Jurnal Penutup ("+this.ed_nb.getText()+")', "+
									" '-','-','-','-','-','-','-','"+this.cb_pembuat.getText()+"','JP','-','"+this.dp_tgl1.getYear()+this.maxPeriode+"','IDR','1',"+Math.abs(nilaiToFloat(this.sg1.cells(4,i)))+",now(),'"+this.app._userLog+"' )";
								sql.add(data);
								data ="insert into gldt_h(no_bukti, no_urut, kode_lokasi, no_dokumen, tanggal, kode_akun, dc, nilai, keterangan,  "+
									"	kode_pp, kode_drk, kode_cust, kode_proyek, kode_task, kode_vendor, kode_lokarea, nik, modul, jenis, periode, kode_curr, kurs, nilai_curr, tgl_input, nik_user) values";
								nu2++;
								data += "('"+this.ed_nb.getText()+"','"+(nu2)+"','"+this.app._lokasi+"','"+this.ed_nb.getText()+"','"+this.dp_tgl1.getDateString()+"','"+this.akunJP.kode+"','"+(dc == "D" ? "C":"D")+"',"+Math.abs(nilaiToFloat(this.sg1.cells(4,i)))+",'Jurnal Penutup ("+this.ed_period.getText()+")', "+
									" '-','-','-','-','-','-','-','"+this.cb_pembuat.getText()+"','JP','-','"+this.dp_tgl1.getYear()+this.maxPeriode+"','IDR','1',"+Math.abs(nilaiToFloat(this.sg1.cells(4,i)))+",now(),'"+this.app._userLog+"' )";
								sql.add(data);
								
								sql.add("update glma set so_akhir = so_akhir "+(dc == "D" ? "+":"-")+" "+Math.abs(nilaiToFloat(this.sg1.cells(4,i)))+" where kode_lokasi = '"+this.app._lokasi+"' and kode_akun = '"+this.sg1.cells(0,i)+"' and periode = '"+perAwal+"01' ");
								sql.add("update glma set so_akhir = so_akhir "+(dc == "D" ? "-":"+")+" "+Math.abs(nilaiToFloat(this.sg1.cells(4,i)))+" where kode_lokasi = '"+this.app._lokasi+"' and kode_akun = '"+this.akunJP.kode+"' and periode = '"+perAwal+"01' ");
						}
					}						
				}				
				//------------------------------------------------------------------------------------------ ANGGARAN ------------------------------------------------------------------------------				
				
				this.dbLib.execArraySQL(sql);	
			}
			catch(e)
			{
				system.alert(this, e,"");
			}
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0","1"),this.ed_jenis);				
					//this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.sg1.clear(); this.sg1.appendRow(); this.ed_kurs.setText("1");
				}
				break;
				
			case "simpan" :
				this.sg1.validasi();
				if  (nilaiToFloat(this.ed_debet.getText()) != nilaiToFloat(this.ed_kredit.getText())){
					system.alert(this,"Total debet dan kredit tidak sama.","");
					return false;
				}
				
				if (parseFloat(this.ed_period.getText().substr(0,4))  != parseFloat(this.app._periode.substr(0,4)) - 1)
				{
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi harus tahun sebelum periode aktif sistem.["+this.app._periode.substr(0,4)+"]");
					return false;
				}
				else this.simpan();
				break;

			case "simpancek" : this.simpan();
				break;
		}
		this.dp_tgl1.setFocus();
	},
	genClick: function(sender){
		try
		{
			if ((this.ed_period.getText() != "") && (this.jenis != undefined))
			{
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'ju_m','no_ju',this.app._lokasi+"-"+this.jenis+this.ed_period.getText().substr(2,4)+".",'0000'));
				this.ed_dok.setFocus();
			}
			else
			{
				system.alert(this,"Periode dan jenis harus valid.","");
			}
		}
		catch (e)
		{
			alert(e);
		}
	},
	showClick: function(sender){
		if (this.cb_bukti != undefined) 
		{
			if (this.cb_bukti.getText() != "") {
				try 
				{
					var data = this.dbLib.runSQL(" select  keterangan, kode_curr "+
												 " from refju_m "+
												 " where no_refju='"+this.cb_bukti.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{									
							line = data.get(0);
							this.ed_desc.setText(line.get("keterangan"));
							this.cb_curr.setText(line.get("kode_curr"));
						} 
					}

					this.sg1.clear(); 
					if (this.app._dbEng == "mysqlt")
					{
						var strSql = " select  a.kode_akun, b.nama as nama_akun, a.keterangan, a.dc,a.nilai,a.kode_pp, ifnull(c.nama,'-') as nama_pp, a.kode_drk,ifnull(d.nama,'-') as nama_drk "+
												 " from refju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												 "                left outer join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
												 "                left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=c.kode_lokasi "+
												 " where a.no_refju = '"+this.cb_bukti.getText()+"'";
					}else
					if (this.app._dbEng == "ado_mssql")
					{
						var strSql = " select  a.kode_akun, b.nama as nama_akun, a.keterangan, a.dc,a.nilai,a.kode_pp, isnull(c.nama,'-') as nama_pp, a.kode_drk,isnull(d.nama,'-') as nama_drk "+
												 " from refju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												 "                left outer join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
												 "                left outer join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=c.kode_lokasi "+
												 " where a.no_refju = '"+this.cb_bukti.getText()+"'";
					}
					
					var data = this.dbLib.runSQL(strSql);
					if (data instanceof portalui_arrayMap)
					{
						if (data.get(0) != undefined)
						{									
							for (var i in data.objList)
							{
								line = data.get(i);
								this.sg1.appendData([line.get("kode_akun"),line.get("nama_akun"),line.get("keterangan"),line.get("dc"),line.get("nilai"),
											  line.get("kode_pp"),line.get("nama_pp"),line.get("kode_drk"),line.get("nama_drk")]);					
							}
						} 
					}
					
				} catch(e)
				{
					system.alert(this,e,"");
				}
			}
		}
	},
	doEditChange: function(sender){
		if (sender == this.ed_period)
		{
			this.ed_nb.setText("");
			//if ((this.ed_period.getText() != "") && (this.cb_jenis.getText() != "") && (this.jenis != undefined)) 
			//	this.bGen.click();
		}
		
		if (sender == this.cb_jenis)
		{
			this.ed_nb.setText("");			
			if (this.cb_jenis.getText() == "ADJUST")
			{
				this.jenis = "JA";
			}
			if (this.cb_jenis.getText() == "AUDIT")
			{
				this.jenis = "JD";
			}
		}
		
		if (sender == this.cb_curr)
		{
			if (this.cb_curr.getText() == "IDR")
			{	
				this.ed_kurs.setText("1");
				this.ed_kurs.setReadOnly(true);
			}
			else
			{
				this.ed_kurs.setReadOnly(false);
			}
		}	
	},
	FindBtnClick: function(sender, event){
		try
		{
			if (sender == this.cb_bukti) 
			{
				this.standarLib.showListData(this,  "Daftar Refernsi Jurnal",this.cb_bukti,undefined, 
													"select no_refju, keterangan from refju_m where kode_lokasi='"+this.app._lokasi+"'",
													"select count(no_refju)      from refju_m where kode_lokasi='"+this.app._lokasi+"'",
													new Array("no_refju","keterangan"),"and", new Array("No Referensi","Keterangan"),false);
				this.sg1.clear(); this.sg1.appendRow(); this.ed_desc.setText("");
			}
			if (sender == this.cb_curr) 
			{
			    this.standarLib.showListData(this, "Daftar Currency",this.cb_curr,undefined, 
											  "select kode_curr, nama  from curr",
											  "select count(kode_curr) from curr",
											  new Array("kode_curr","nama"),"where", new Array("Kode Curr","Deskripsi"),false);
			}
			if (sender == this.cb_pembuat) 
			{   
			    this.standarLib.showListData(this, "Daftar Petugas",this.cb_pembuat,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
											  new Array("nik","nama"),"and", new Array("NIK","Nama"),false);
			}
			
			if (sender == this.cb_setuju) 
			{   
			    this.standarLib.showListData(this, "Daftar yang Menyetujui",this.cb_setuju,undefined, 
											  "select nik, nama  from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
											  "select count(nik) from karyawan where kode_lokasi ='"+this.app._lokasi+"'",
											  new Array("nik","nama"),"and", new Array("NIK","Nama"),false);
			}
		}
		catch(e)
		{
			alert(e);
		}
	},
	doCellEnter: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 2 : 
							if (this.sg1.getCell(2,row) == "")
							this.sg1.setCell(2,row,this.ed_desc.getText());
					break;
				case 3 : 
							if (this.sg1.getCell(3,row) == "")
							this.sg1.setCell(3,row,"D");
					break;
				case 5 : 
							if ((this.sg1.getCell(5,row) == "") && (row > 0)) {
							this.sg1.setCell(5,row,this.sg1.getCell(5,(row-1)));
							this.sg1.setCell(6,row,this.sg1.getCell(6,(row-1)));
							}
					break;
			}
		}catch(e)
		{
			alert("doFindBtnClick : " + e);
		}	
	},
	doFindBtnClick: function(sender, col, row) {
		try
		{
			switch(col)
			{
				case 0 : 
					this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg1, this.sg1.row, this.sg1.col, 
													  "select a.kode_akun, a.nama from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
													  "select count(a.kode_akun)  from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
													  new Array("a.kode_akun","a.nama"),"and",new Array("Kode Akun","Nama Akun"),false);
					break;
				case 5 : 
					this.standarLib.showListDataForSG(this, "Daftar PP",this.sg1, this.sg1.row, this.sg1.col,
													  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
													  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
													  new Array("kode_pp","nama"),"and",new Array("Kode PP","Deskripsi"),false);
					break;
				case 7 : 
					this.standarLib.showListDataForSG(this, "Daftar Anggaran",this.sg1, this.sg1.row, this.sg1.col,
													  "select distinct a.kode_drk, a.nama from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  "select count(distinct a.kode_drk)  from drk a inner join anggaran_d b on a.kode_drk=b.kode_drk where a.tahun=substring(b.periode,1,4) and b.periode like '"+this.ed_period.getText().substr(0,4)+"%' and b.kode_pp = '"+this.sg1.getCell(5,row)+"' and b.kode_akun='"+this.sg1.getCell(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'",
													  new Array("a.kode_drk","a.nama"),"and",new Array("Kode Anggaran","Deskripsi"),true);
					break;
			}
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJuAudit] : doFindBtnClick : " + e);
		}
	},
	doNilaiChange: function(){
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i)){
					if (this.sg1.getCell(4,i) != ""){
						if (this.sg1.getCell(3, i).toUpperCase() == "D")					
							totD += nilaiToFloat(this.sg1.getCell(4,i));			
						if (this.sg1.getCell(3, i).toUpperCase() == "C")					
							totC += nilaiToFloat(this.sg1.getCell(4,i));			
					}
				}
			}
			this.ed_debet.setText(floatToNilai(totD));
			this.ed_kredit.setText(floatToNilai(totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJuAudit]::doNilaiChange:"+e);
		}
	},
	doCellExit: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 3 : 
				case 4 : 
							this.sg1.validasi();
					break;
			}
		}catch(e)
		{
			systemAPI.alert("doFindBtnClick : " + e);
		}	
	},
	hitungGar: function(){
		var row,dtJurnal = new portalui_arrayMap();
		var nemu = false;
		var nreal,ix,dtJrnl = 0;
					
	    for (var i=0; i < this.sg1.rows.getLength(); i++)
		{
			if (!this.sg1.rowValid(i)) continue;
			kdAkun = this.sg1.getCell(0,i);
			kdPP = this.sg1.getCell(5,i);
			kdDRK = this.sg1.getCell(7,i);
			
			if (this.sg1.getCell(3,i) == "D") {nreal = nilaiToFloat(this.sg1.getCell(4,i));}
			else {nreal = nilaiToFloat(this.sg1.getCell(4,i)) * -1;}
			
			nemu = false;
			ix = 0;
						
			for (var j in dtJurnal.objList)
			{		
			  if ((kdAkun == dtJurnal.get(j).get("kode_akun")) && (kdPP == dtJurnal.get(j).get("kode_pp")) && (kdDRK == dtJurnal.get(j).get("kode_drk")))
			  {
				nemu = true;
				row = dtJurnal.get(j);
				ix = j;
				break;
			  }
			}
			
			if (!nemu){
				row = new portalui_arrayMap();
				row.set("kode_akun",kdAkun);
				row.set("kode_pp",kdPP);
				row.set("kode_drk",kdDRK);
				row.set("nilai",nreal);
				row.set("saldo_gar",0);
				dtJrnl++;
				dtJurnal.set(dtJrnl,row);						
			}else {
				dtJurnal.get(ix).set("nilai",row.get("nilai") + nreal);				
			}
		}
		
		if (dtJurnal.getLength() > 0){
			var desc1 = new portalui_arrayMap();
			desc1.set("kode_akun",150);
			desc1.set("kode_pp",150);
			desc1.set("kode_drk",150);
			desc1.set("nilai",150);
			desc1.set("saldo_gar",150);
			
			var desc2 = new portalui_arrayMap();
			desc2.set("kode_akun","S");
			desc2.set("kode_pp","S");
			desc2.set("kode_drk","S");	
			desc2.set("nilai","N");
			desc2.set("saldo_gar","N");
			
			var dataDesc = new portalui_arrayMap();
			dataDesc.set(0,desc1);
			dataDesc.set(1,desc2);
			dtJurnal.setTag2(dataDesc);
		}
		this.gridJurnal = dtJurnal;
		//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		
		var line = undefined;
		var sls = 0;
		for (var i in this.gridJurnal.objList)
		{
			line = this.gridJurnal.get(i);
			var baris,data = this.dbLib.runSQL("select fn_cekagg2('"+line.get("kode_pp")+"','"+this.app._lokasi+"','"+line.get("kode_akun")+"','"+line.get("kode_drk")+"','"+this.ed_period.getText()+"') as gar ");
			if (data instanceof portalui_arrayMap)
			{
				baris = data.get(0);
				if (baris != undefined)
				{
					baris = baris.get("gar");
					data = baris.split(";");
					sls = parseFloat(data[0]) - parseFloat(data[1]);
					line.set("saldo_gar",sls);
					this.gridJurnal.set(i,line);		
				} 
			} else alert(data);
		}	
	},
	garClick: function(sender){
		try
		{
			if (this.ed_debet.getText() != "0")
			{
				this.jurnal.sg.clear();
				this.hitungGar();
				if (this.gridJurnal != undefined){				
					this.jurnal.setData(this.gridJurnal);
					this.jurnal.showModal();
				}
			}
		} catch	(e)
		{
			systemAPI.alert(e);
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
						this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (no bukti : "+ this.ed_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						try{
							eval("result = "+result);
							result = result.result;
							if (result[0].rs.rows[0] !== undefined){
								this.akunJP = {kode:result[0].rs.rows[0].kode_akun,nama:result[0].rs.rows[0].nama};					
							}else {
								systemAPI.alert("Akun JP masih belum ada","Untuk menandai akun JP di form Relasi Flag Akun");
								return;
							}
							if (result[1].rs.rows[0] !== undefined)
								this.maxPeriode = result[1].rs.rows[0].value1;												
							if (this.app._periode != this.app._periode.substr(0,4) +this.maxPeriode){
								systemAPI.alert("Periode sekarang ("+this.app._periode+") masih belum akhir periode keuangan("+(this.app._periode.substr(0,4) +this.maxPeriode)+").","Process JP masih tidak bisa dilakukan.");
								return;
							}
						}catch(e){
							system.alert(this,"Error getdata",result);
						}
	      			break;
	    		}    		
			}
			catch(e)
			{
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});
