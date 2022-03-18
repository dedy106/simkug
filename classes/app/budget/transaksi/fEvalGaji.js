//BGAJI,BTPKK,BSPPD,BPMBN,BTPKU,BFFS
/**
 * @author mr
 */
window.app_budget_transaksi_fEvalGaji = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fEvalGaji.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fEvalGaji";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Approval Anggaran Beban Gaji SDM: Input", 0);
		try{	
			uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator;portalui_saiCBB");			
			this.lblTgl1 = new portalui_label(this, {bound: [20, 32, 101, 20],caption: "Tanggal",underline: true});						
			this.dp_tgl1 = new portalui_datePicker(this, {bound: [120, 32, 90, 18]});				
			this.bGen = new portalui_button(this, {bound: [256, 78, 80, 20],caption: "Gen",icon: "url(icon/" + system.getThemes() + "/process.png)"});				
			this.ed_nb = new portalui_saiLabelEdit(this, {bound: [20, 78, 230, 20],caption: "No Bukti",readOnly:true});			
			this.eTotE = new portalui_saiLabelEdit(this,{bound:[720,78,200,20],caption:"Tot Beban Eksisting",readOnly:true,tipeText:ttNilai,text:"0"});
			this.ed_desc = new portalui_saiLabelEdit(this, {bound: [20, 10, 500, 20],caption: "Deskripsi",maxLength: 150,tag:1});								
			this.eTotP = new portalui_saiLabelEdit(this,{bound:[720,10,200,20],caption:"Tot Beban Estimasi",readOnly:true,tipeText:ttNilai,text:"0"});
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],caption:"Tahun",tipeText:ttAngka,maxLength:4,tag:2});
			this.i_viewer = new portalui_imageButton(this,{bound:[200,12,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoadData"]});
			this.eTotT = new portalui_saiLabelEdit(this,{bound:[720,12,200,20],caption:"Tot Beban Tambah",readOnly:true,tipeText:ttNilai,text:"0"});
			
			this.p0 = new portalui_panel(this,{bound: [20, 231, 900, 355],caption: "Daftar Anggaran Beban Gaji SDM"});	    				
			this.sg0 = new portalui_saiGrid(this.p0, {bound: [1, 20, 895, 308],colCount: 9,
					colTitle:["Status","Kode Akun","Nama Akun","Periode","Kode BU","Bisnis Unit","Kode RKA","Nama RKA","Nilai"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,140,90,140,90,80,140,100,80]],
					colFormat:[[8],[cfNilai]],readOnly:true,defaultRow:1});    			
			this.sgNav0 = new portalui_sgNavigator(this.p0, {bound: [1, 330, 897, 25],grid: this.sg0,border: 0,buttonStyle: 3});		
			
			this.p1 = new portalui_panel(this,{bound: [20, 232, 900, 355],caption: "Daftar Rincian Gaji"});	    				
			this.sg1 = new portalui_saiGrid(this.p1, {bound: [1, 20, 895, 308],colCount:15,				 
				colTitle:"NIK, Nama Karyawan, Tgl Masuk, Status Kary., Kode Band, Nama Band, Kode Jab, Nama Jabatan, Kode BU, Bisnis Unit, Kode Loker, Nama Loker, Kode Kota, Nama Kota, Nilai",
				colWidth:[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14],[80,150,80,80,80,80,80,120,80,120,80,120,80,120,100]],
				colFormat:[[14],[cfNilai]],readOnly:true,defaultRow:1});    								
			this.sgNav = new portalui_sgNavigator(this.p1, {bound: [1, 330, 897, 25],grid: this.sg1,border: 0,buttonStyle: 3});		
			
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.setTabChildIndex(); 

			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();											
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.sg0.onNilaiChange.set(this, "doNilaiChange");
			this.sg0.onDblClick.set(this,"doDblClick");
			this.sgNav0.onPager.set(this, "doPager");
			this.sgNav.onPager.set(this, "doPager");
			this.ed_period= this.dp_tgl1.getYear().toString()+(this.dp_tgl1.getMonth() < 10 ? "0" : "") +this.dp_tgl1.getMonth();
			this.standarLib.clearByTag(this,["0","1"],this.dp_tgl1);				
			this.baris = this.app._baris;
			this.sg0.clear(1);
			this.sg1.clear(1);
			this.eTahun.setText("2010");
			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fEvalGaji.extend(window.portalui_childForm);
window.app_budget_transaksi_fEvalGaji.implement({
	mainButtonClick : function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");		
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");		
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");		
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0","8","9"),this.dp_tgl1);				
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.sg0.clear(1); 
					this.sg1.clear(1); 
				}
				break;
			case "simpan" :				
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_gajiapp_m','no_app',this.app._lokasi+"-EVGJ"+this.dp_tgl1.getThnBln().substr(2,2)+""+(this.dp_tgl1.getMonth()< 10 ?"0":"")+this.dp_tgl1.getMonth()+".",'0000'));
				var sql = new server_util_arrayList();
				sql.add("delete from agg_d where modul='BGAJI' and kode_lokasi='"+this.app._lokasi+"' and tahun= '"+this.eTahun.getText()+"' ");
				
				sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul) "+
					    "		select a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,x.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,sum(a.nilai),'"+this.eTahun.getText()+"',a.kode_lokasi+'GJ'+'"+this.eTahun.getText()+"','BGAJI' "+  
					    "		from agg_gaji_d a "+
						"					   inner join agg_param	x on a.kode_param=x.kode_param and a.kode_lokasi=x.kode_lokasi and substring(a.periode,1,4)=x.tahun "+
					    "					   inner join agg_rka b on x.kode_rka=b.kode_rka and x.kode_lokasi=b.kode_lokasi and x.tahun=b.tahun "+
					    "					   inner join agg_drk c on b.kode_drk=c.kode_drk and b.kode_lokasi=c.kode_lokasi and b.tahun=c.tahun "+						
					    "		where a.nilai<> 0 and a.periode like '"+this.eTahun.getText()+"%' "+
					    "		group by a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,x.kode_akun,a.kode_pp,a.periode ");				
				
				
				sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul) "+
					    "		select a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,x.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,sum(a.nilai),'"+this.eTahun.getText()+"',a.kode_lokasi+'TPKK'+'"+this.eTahun.getText()+"','BTPKK' "+  
					    "		from agg_gaji_tpkk a "+
						"					   inner join agg_param	x on a.kode_param=x.kode_param and a.kode_lokasi=x.kode_lokasi and substring(a.periode,1,4)=x.tahun "+
					    "					   inner join agg_rka b on x.kode_rka=b.kode_rka and x.kode_lokasi=b.kode_lokasi and x.tahun=b.tahun "+
					    "					   inner join agg_drk c on b.kode_drk=c.kode_drk and b.kode_lokasi=c.kode_lokasi and b.tahun=c.tahun "+						
					    "		where a.nilai<> 0 and a.periode like '"+this.eTahun.getText()+"%' "+
					    "		group by a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,x.kode_akun,a.kode_pp,a.periode ");				

				
				sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul) "+
					    "		select a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,x.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,sum(a.nilai),'"+this.eTahun.getText()+"',a.kode_lokasi+'PMBN'+'"+this.eTahun.getText()+"','BPMBN' "+  
					    "		from agg_gajipmbn_d a "+
						"					   inner join agg_param	x on a.kode_param=x.kode_param and a.kode_lokasi=x.kode_lokasi and substring(a.periode,1,4)=x.tahun "+
					    "					   inner join agg_rka b on x.kode_rka=b.kode_rka and x.kode_lokasi=b.kode_lokasi and x.tahun=b.tahun "+
					    "					   inner join agg_drk c on b.kode_drk=c.kode_drk and b.kode_lokasi=c.kode_lokasi and b.tahun=c.tahun "+						
					    "		where a.nilai<> 0 and a.periode like '"+this.eTahun.getText()+"%' "+
					    "		group by a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,x.kode_akun,a.kode_pp,a.periode ");										
				
				sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul) "+
					    "		select a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,a.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,sum(a.nilai+a.nilai_harian),'"+this.eTahun.getText()+"',a.kode_lokasi+'SPPD'+'"+this.eTahun.getText()+"','BSPPD' "+  
					    "		from agg_sppd_d a "+
					    "					   inner join agg_rka b on a.kode_rka=b.kode_rka and a.kode_lokasi=b.kode_lokasi and substring(a.periode,1,4)=b.tahun "+
					    "					   inner join agg_drk c on b.kode_drk=c.kode_drk and b.kode_lokasi=c.kode_lokasi and b.tahun=c.tahun "+						
					    "		where a.nilai+a.nilai_harian<> 0 and a.periode like '"+this.eTahun.getText()+"%' "+
					    "		group by a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,a.kode_akun,a.kode_pp,a.periode ");				
				
				sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul) "+
					    "		select a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,a.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,sum(a.nilai),'"+this.eTahun.getText()+"',a.kode_lokasi+'TPKU'+'"+this.eTahun.getText()+"','BTPKU' "+  
					    "		from agg_tpku a "+
					    "					   inner join agg_rka b on a.kode_rka=b.kode_rka and a.kode_lokasi=b.kode_lokasi and substring(a.periode,1,4)=b.tahun "+
					    "					   inner join agg_drk c on b.kode_drk=c.kode_drk and b.kode_lokasi=c.kode_lokasi and b.tahun=c.tahun "+						
					    "		where a.nilai<> 0 and a.periode like '"+this.eTahun.getText()+"%' "+
					    "		group by a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,a.kode_akun,a.kode_pp,a.periode ");				
				
				
				sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul) "+
					    "		select a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,a.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,sum(a.nilai),'"+this.eTahun.getText()+"',a.kode_lokasi+'FFS'+'"+this.eTahun.getText()+"','BFFS' "+  
					    "		from agg_tpkuffs a "+
					    "					   inner join agg_rka b on a.kode_rka=b.kode_rka and a.kode_lokasi=b.kode_lokasi and substring(a.periode,1,4)=b.tahun "+
					    "					   inner join agg_drk c on b.kode_drk=c.kode_drk and b.kode_lokasi=c.kode_lokasi and b.tahun=c.tahun "+						
					    "		where a.nilai<> 0 and a.periode like '"+this.eTahun.getText()+"%' "+
					    "		group by a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,a.kode_akun,a.kode_pp,a.periode ");				
						
												
				this.dbLib.execArraySQL(sql);
				break;
			case "simpancek" : this.simpan();
				break;
		}
	},
	genClick: function(sender){
		try{
			if (this.ed_period != ""){
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_gajiapp_m','no_app',this.app._lokasi+"-EVGJ"+this.dp_tgl1.getThnBln().substr(2,2)+""+(this.dp_tgl1.getMonth()< 10 ?"0":"")+this.dp_tgl1.getMonth()+".",'0000'));
				this.ed_desc.setFocus();
			}
		}
		catch (e)
		{
			alert(e);
		}
	},
	doLoadData: function(sender){	
		if (this.eTahun.getText() != "") {
			var data = this.dbLib.getDataProvider(
											    "select case a.jenis_agg when 'T' then 'TAMBAH' "+
												"						 when 'E' then 'EXIST'   "+ 
												"						 when 'P' then 'ESTIMASI' end as status, "+
												"x.kode_akun,b.nama as nama_akun,a.periode,a.kode_pp,c.nama as nama_pp,x.kode_rka,d.nama as nama_rka,sum(a.nilai) as nilai "+
												"from agg_gaji_d a "+
												"	  inner join agg_param x on a.kode_param=x.kode_param and a.kode_lokasi=x.kode_lokasi and substring(a.periode,1,4)=x.tahun "+
												"	  inner join agg_masakun b on x.kode_akun=b.kode_akun and x.kode_lokasi=b.kode_lokasi "+
												"	  inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
												"	  inner join agg_rka d on x.kode_rka=d.kode_rka and a.kode_lokasi=x.kode_lokasi and substring(a.periode,1,4)=x.tahun "+
												"where a.periode like '"+this.eTahun.getText()+"%' and a.nilai<>0 "+
												"group by a.jenis_agg,x.kode_akun,b.nama,a.periode,a.kode_pp,c.nama,x.kode_rka,d.nama "+
												"union "+
												"select case a.jenis_agg when 'T' then 'TAMBAH' "+
												"						 when 'E' then 'EXIST'   "+ 
												"						 when 'P' then 'ESTIMASI' end as status, "+
												"x.kode_akun,b.nama as nama_akun,a.periode,a.kode_pp,c.nama as nama_pp,x.kode_rka,d.nama as nama_rka,sum(a.nilai) as nilai "+
												"from agg_gaji_tpkk a "+
												"	  inner join agg_param x on a.kode_param=x.kode_param and a.kode_lokasi=x.kode_lokasi and substring(a.periode,1,4)=x.tahun "+
												"	  inner join agg_masakun b on x.kode_akun=b.kode_akun and x.kode_lokasi=b.kode_lokasi "+
												"	  inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
												"	  inner join agg_rka d on x.kode_rka=d.kode_rka and a.kode_lokasi=x.kode_lokasi and substring(a.periode,1,4)=x.tahun "+
												"where a.periode like '"+this.eTahun.getText()+"%' and a.nilai<>0 "+
												"group by a.jenis_agg,x.kode_akun,b.nama,a.periode,a.kode_pp,c.nama,x.kode_rka,d.nama "+
												"union "+
												"select case a.jenis_agg when 'T' then 'TAMBAH' "+
												"						 when 'E' then 'EXIST'   "+ 
												"						 when 'P' then 'ESTIMASI' end as status, "+
												"x.kode_akun,b.nama as nama_akun,a.periode,a.kode_pp,c.nama as nama_pp,x.kode_rka,d.nama as nama_rka,sum(a.nilai) as nilai "+
												"from agg_gajipmbn_d a "+
												"	  inner join agg_param x on a.kode_param=x.kode_param and a.kode_lokasi=x.kode_lokasi and substring(a.periode,1,4)=x.tahun "+
												"	  inner join agg_masakun b on x.kode_akun=b.kode_akun and x.kode_lokasi=b.kode_lokasi "+
												"	  inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
												"	  inner join agg_rka d on x.kode_rka=d.kode_rka and a.kode_lokasi=x.kode_lokasi and substring(a.periode,1,4)=x.tahun "+
												"where a.periode like '"+this.eTahun.getText()+"%' and a.nilai<>0 "+
												"group by a.jenis_agg,x.kode_akun,b.nama,a.periode,a.kode_pp,c.nama,x.kode_rka,d.nama "+
												
												"union "+
												"select 'EXIST'  as status, "+
												"a.kode_akun,b.nama as nama_akun,a.periode,a.kode_pp,c.nama as nama_pp,a.kode_rka,d.nama as nama_rka,sum(a.nilai+a.nilai_harian) as nilai "+
												"from agg_sppd_d a "+
												"	  inner join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"	  inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
												"	  inner join agg_rka d on a.kode_rka=d.kode_rka and a.kode_lokasi=a.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
												"where a.periode like '"+this.eTahun.getText()+"%' and a.nilai<>0 "+
												"group by a.kode_akun,b.nama,a.periode,a.kode_pp,c.nama,a.kode_rka,d.nama "+
												
												"union "+
												"select 'EXIST'  as status, "+
												"a.kode_akun,b.nama as nama_akun,a.periode,a.kode_pp,c.nama as nama_pp,a.kode_rka,d.nama as nama_rka,sum(a.nilai) as nilai "+
												"from agg_tpku a "+
												"	  inner join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"	  inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
												"	  inner join agg_rka d on a.kode_rka=d.kode_rka and a.kode_lokasi=a.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
												"where a.periode like '"+this.eTahun.getText()+"%' and a.nilai<>0 "+
												"group by a.kode_akun,b.nama,a.periode,a.kode_pp,c.nama,a.kode_rka,d.nama "+
												"union "+
												"select 'EXIST'  as status, "+
												"a.kode_akun,b.nama as nama_akun,a.periode,a.kode_pp,c.nama as nama_pp,a.kode_rka,d.nama as nama_rka,sum(a.nilai) as nilai "+
												"from agg_tpkuffs a "+
												"	  inner join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
												"	  inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
												"	  inner join agg_rka d on a.kode_rka=d.kode_rka and a.kode_lokasi=a.kode_lokasi and substring(a.periode,1,4)=d.tahun "+
												"where a.periode like '"+this.eTahun.getText()+"%' and a.nilai<>0 "+
												"group by a.kode_akun,b.nama,a.periode,a.kode_pp,c.nama,a.kode_rka,d.nama ",
												
												true);			
			this.dataABAU = undefined;
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				this.rowPerPage = 20;
				this.sgNav0.setTotalPage(Math.ceil(data.rs.rows.length / this.rowPerPage));
				this.sgNav0.rearrange();		
				this.sgNav0.activePage = 0;						
				this.dataABAU = data;
				this.doPagerSG0(1);
			} else systemAPI.alert(data);
		}
	},
	doPagerSG0: function(page){
		this.pageSG0 = page;
		var start = (page - 1) * this.rowPerPage;
		var finish = start + this.rowPerPage;
		finish = finish > this.dataABAU.rs.rows.length ? this.dataABAU.rs.rows.length : finish;
		this.sg0.clear();
		var data = this.dataABAU;
		for (var i= start; i < finish;i++){
			line = data.rs.rows[i];					
			this.sg0.appendData([line.status.toUpperCase(),line.kode_akun,line.nama_akun,line.periode,line.kode_pp,line.nama_pp,line.kode_rka,line.nama_rka,floatToNilai(line.nilai)]);
		}
		this.sg0.setNoUrut(start);
	},
	doSelect: function(sender, year, month, day){
		if (month < 10)
			month = "0"+month;
		this.ed_period= year.toString()+month;
	},
	doNilaiChange: function(){		
		var tot1 = tot2 = tot3 = 0;
		var line;
		for (var i in this.dataABAU.rs.rows){
			line = this.dataABAU.rs.rows[i];
			if (line.status.toUpperCase() == "EXIST")
				tot1 += parseFloat(line.nilai);
			if (line.status.toUpperCase() == "ESTIMASI")
				tot2 += parseFloat(line.nilai);
			if (line.status.toUpperCase() == "TAMBAH")
				tot3 += parseFloat(line.nilai);
		}
		this.eTotE.setText(floatToNilai(tot1));
		this.eTotP.setText(floatToNilai(tot2));
		this.eTotT.setText(floatToNilai(tot3));
	},
	doChangeCell: function(sender, col, row) {		
		if (this.dataABAU){			
			this.dataABAU.rs.rows[(this.pageSG0 - 1) * this.rowPerPage + row].status = sender.cells(0, row);						
		}
		this.sg0.validasi();
	},
	doPager: function(sender, page){
		if (sender == this.sgNav0) this.doPagerSG0(page);
		if (sender == this.sgNav) this.doLoadDetail(page);
	},
	doLoadDetail: function(page){
		this.pageSG1 = page;
		var start = (page - 1) * this.rowPerPage;
		var finish = start + this.rowPerPage;
		finish = finish > this.dataDetail.rs.rows.length ? this.dataDetail.rs.rows.length : finish;
		this.sg1.clear();
		var data = this.dataDetail;
		for (var i= start; i < finish;i++){
			line = data.rs.rows[i];																
			this.sg1.appendData([line.nik,line.nama,line.tgl_masuk,line.status_org.toUpperCase(),line.kode_band,line.nama_band,line.kode_jab,line.nama_jab,line.kode_pp,line.nama_pp,line.kode_loker,line.nama_loker,line.kode_kota,line.nama_kota,floatToNilai(line.nilai)]);
		}
		this.sg1.setNoUrut(start);
	},
	doDblClick: function(sender, col , row){
		if (this.sg0.cells(0,row) == "EXIST") var jenis = "E";
		else if (this.sg0.cells(0,row) == "ESTIMASI") var jenis = "P";
		else if (this.sg0.cells(0,row) == "TAMBAH") var jenis = "T";
		var data = this.dbLib.getDataProvider(
										    "select a.nik,a.nama, convert(varchar,a.tgl_masuk,103) as tgl_masuk,case when a.status_org='8' then 'ORGANIK' else 'NONORGANIK' end as status_org,a.kode_band,b.nama as nama_band,a.kode_jab,c.nama as nama_jab,a.kode_pp,d.nama as nama_pp,a.kode_loker,e.nama as nama_loker,a.kode_kota,f.nama as nama_kota,x.nilai "+
										    "from agg_gaji_d x   inner join agg_param y on x.kode_param=y.kode_param and x.kode_lokasi=y.kode_lokasi and substring(x.periode,1,4)=y.tahun"+
											"					 inner join agg_karyawan a on x.nik=a.nik and substring(x.periode,1,4)=a.tahun and x.kode_lokasi=a.kode_lokasi "+
											"					 inner join agg_band b on a.kode_band=b.kode_band "+
										    "					 inner join agg_jab c on a.kode_jab=c.kode_jab "+
										    "					 inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi "+
										    "					 inner join agg_loker e on a.kode_loker=e.kode_loker and a.kode_lokasi=e.kode_lokasi "+
										    "					 inner join agg_kota f on a.kode_kota=f.kode_kota "+
										    "where x.nilai<> 0 and y.kode_rka='"+this.sg0.cells(6,row)+"' and a.kode_pp = '"+this.sg0.cells(4,row)+"' and y.kode_akun = '"+this.sg0.cells(1,row)+"' and x.periode like '"+this.eTahun.getText()+"%' and x.jenis_agg = '"+jenis+"' and a.kode_lokasi='"+this.app._lokasi+"' ",
										true);		
		
		if (typeof data != "string"){
			var line;			
			this.sgNav.setTotalPage(Math.ceil(data.rs.rows.length / 20));
			this.sgNav.rearrange();
			this.dataDetail = data;
			this.doLoadDetail(1);			
		} else alert(data);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
					if (result.toLowerCase().search("error") == -1)					
					{						
						this.app._mainForm.pesan(2,"Transaksi sukses tersimpan dengan no bukti :("+ this.ed_nb.getText()+")");						
						this.app._mainForm.bClear.click();              						
					}else system.info(this,result,"");
	    			break;	      			
					case "listData" :
						this.sg1.clear(1); 
					break;
	    		}
			}
			catch(e)
			{
				alert(e);
			}
	    }
	}
});
