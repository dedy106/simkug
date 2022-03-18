/**
 * @author mr
	
 */
window.app_budget_master_fFatarifCalc = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fFatarifCalc.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fFatarifCalc";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Evaluasi Tarif BPP Aktiva Tetap : Input", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar;portalui_saiTable");			
			this.eLokasi = new portalui_saiCBBL(this,{bound:[20,22,200,20],caption:"Lokasi", multiSelection:false,change:[this,"doEditChange"]});				
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],caption:"Tahun Angg.",maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});								
			this.ePersen = new portalui_saiLabelEdit(this,{bound:[20,25,180,20],caption:"% Perubahan",tipeText: ttNilai,text:"100"});
			this.bHitung = new portalui_button(this,{bound:[888,25,80,18],caption:"Tampil",hint:"Tampil Data Tahun Angg.",click:[this,"doHitungClick"]});		
		
			this.p1 = new portalui_panel(this);
			this.p1.setLeft(20);
			this.p1.setTop(208);
			this.p1.setWidth(950);
			this.p1.setHeight(388);
			this.p1.setName('p1');
			this.p1.setCaption('Item Data Parameter BPP');
			
			uses("portalui_saiGrid;portalui_sgNavigator");	
			this.sg1 = new portalui_saiGrid(this.p1, {bound: [1, 20, 945, 335],tag: 2,colCount:8,
				colTitle: ["Kode Param","Nama Parameter","Kode Akun","Nama Akun","Satuan","Tarif Acuan","% Perubahan","Tarif Final"],
				colWidth:[[0,1,2,3,4,5,6,7],[70,200,100,250,60,80,70,80]],
				colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],
				colReadOnly:[true,[0,1,2,3,4,5],[6,7]],
				defaultRow:1,autoAppend:true,
				change:[this,"doChangeCell"],selectCell:[this,"doSelectCell"]
			});    			
			this.sgNav1 =  new portalui_sgNavigator(this.p1,{bound:[1,360,945,25], grid:this.sg1, border:0, buttonStyle:3, pager:[this,"doPager"]});
					
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();	
			
			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}
			
			this.eLokasi.setSQL("select kode_lokasi, nama from lokasi ",["kode_lokasi","nama"],false,["Kode","Nama"],"where","Data Lokasi",true);
			this.eLokasi.setText(this.app._lokasi);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fFatarifCalc.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fFatarifCalc.implement({
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return;
		try{
			switch (event)
			{
				case "clear" :
					this.sg1.clear(1);
					break;
				case "simpan" :
						if (this.prog != "1") {
							system.alert(this,"Transaksi tidak valid.","Progress modul AKTAP tidak 1 [belum close].");
							return false;
						}
						uses("server_util_arrayList");
						sql = new server_util_arrayList();			
						
						sql.add("delete from agg_fasusut_d where status = 'BPP' and progress = '1' and periode like '"+this.eTahun.getText()+"%'");
						sql.add("delete from agg_d where modul = 'BPP' and progress = '1' and tahun='"+this.eTahun.getText()+"'");
						sql.add("delete from agg_fa_param_d_ubah where progress = '1' and tahun='"+this.eTahun.getText()+"'");
						
						sql.add("insert into agg_fasusut_d (no_fasusut,no_fa,periode,nilai,kode_lokasi,akun_bp,akun_ap,kode_pp,kode_drk,kode_akun,dc,no_del,status,jenis_agg,posted,progress,kode_param) "+
								"select no_fasusut,no_fa,periode,nilai,kode_lokasi,akun_bp,akun_ap,kode_pp,kode_drk,kode_akun,dc,no_del,status,jenis_agg,posted,'1',kode_param "+
								"from agg_fasusut_d where status='BPP' and periode like '"+this.eTahun.getText()+"%' and progress = '0'");
						
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("insert into agg_fa_param_d_ubah (kode_param,kode_akun,tarif,tahun,progress) values "+
										"('"+this.sg1.cells(0,i)+"','"+this.sg1.cells(2,i)+"',"+parseNilai(this.sg1.cells(7,i))+",'"+this.eTahun.getText()+"','1')");								
								sql.add("update agg_fasusut_d set nilai=round(nilai*"+parseNilai(this.sg1.cells(6,i))+"/100,0) "+
										"where progress = '1' and substring(periode,1,4)='"+this.eTahun.getText()+"' and kode_param= '"+this.sg1.cells(0,i)+"' and kode_akun= '"+this.sg1.cells(2,i)+"' ");
							}
						}		
						
						sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,jenis_agg,progress) "+
								"		select a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,a.akun_bp,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,a.nilai,'"+this.eTahun.getText()+"',a.no_fa,a.status,"+
								"              case when a.jenis_agg = 'EXIST' then 'E' when a.jenis_agg = 'ESTIMASI' then 'P' else 'T' end as jenis,'1' as progress  "+
								"		from agg_fasusut_d a "+
								"				       inner join agg_fasusut_m e on a.no_fasusut=e.no_fasusut and a.kode_lokasi=e.kode_lokasi "+
								"					   inner join agg_rka b on a.kode_drk=b.kode_rka and substring(a.periode,1,4)=b.tahun  "+
								"					   inner join agg_drk c on b.kode_drk=c.kode_drk and b.tahun=c.tahun  "+						
								"		where a.periode like '"+this.eTahun.getText()+"%' and e.tahun='"+this.eTahun.getText()+"' and a.status = 'BPP' and a.progress = '1' ");				
								
						this.dbLib.execArraySQL(sql);					
					break;
			}
			this.eTahun.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
    doHitungClick: function(sender){
		try{
			if (this.eTahun.getText() != "" && this.ePersen.getText() != ""){
				var totPersen = nilaiToFloat(this.ePersen.getText());
				var data = this.dbLib.getDataProvider(
							    "select a.kode_param,b.nama as nama_param,a.kode_akun,c.nama as nama_akun,a.satuan,round(a.tarif,0) as tarif,"+parseNilai(this.ePersen.getText())+" as persen,round((round(a.tarif,0)*"+totPersen+"/100),0) as tarif2  "+
								"from agg_fa_param_d a inner join agg_fa_param_m b on a.kode_param=b.kode_param and a.kode_lokasi='"+this.app._lokasi+"' "+
								"                      inner join agg_masakun c on a.kode_akun=c.kode_akun and c.kode_lokasi=a.kode_lokasi "+
								"where c.kode_lokasi='"+this.eLokasi.getText()+"' and a.tahun='"+this.eTahun.getText()+"'");
				eval("data = "+data+";");				
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg1.appendData([line.kode_param,line.nama_param,line.kode_akun,line.nama_akun,line.satuan,floatToNilai(line.tarif),  
											 floatToNilai(line.persen),floatToNilai(line.tarif2)]);
					}
				} else this.sg1.clear(1);
				this.sg1.validasi();			
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},   
	doChange: function(sender){
		if (sender == this.eTahun && this.eTahun.getText()!="") {			
			this.prog = "1";
			var data = this.dbLib.getDataProvider("select progress from agg_close where progress <> '1' and modul = 'AKTAP' and tahun = '"+this.eTahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}
		}
	},
	doPager: function(sender, page){
		try{
			if (sender == this.sgNav1) this.sg1.selectPage(page);
		}catch(e)
		{alert(e);}
	},
	doChangeCell: function(sender, col, row){
		try{
			if (col == 7 || col == 5 || col == 6){
				this.sg1.onChange.set(this,undefined);				
				if ((this.sg1.getCell(5,row) != "") && (this.sg1.getCell(6,row) != "")) {					
					var tarifBaru = Math.round(nilaiToFloat(this.sg1.cells(5,row)) * ((nilaiToFloat(this.sg1.getCell(6,row))) / 100));
					this.sg1.setCell(7,row,floatToNilai(tarifBaru));
				}
				this.sg1.validasi();
				this.sg1.onChange.set(this,"doChangeCell");
			}
		}catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1) {
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.eTahun.getText()+")");
						this.app._mainForm.bClear.click();  
					}
					else system.alert(this,result);
					break;
			}
		}
	}
});