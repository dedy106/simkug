/**
 * @author mr
*/
window.app_budget_master_fBpcctarif = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fBpcctarif.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fBpcctarif";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Master Tarif BPCC: Input/Koreksi", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar;portalui_saiTable");
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,tag:5,change:[this,"doChange"]});					
			this.eLokasi = new portalui_saiCBBL(this,{bound:[20,27,200,20],caption:"Kode Lokasi", multiSelection:false,change:[this,"doChange"]});
			this.eParam = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Parameter", multiSelection:false,change:[this,"doChange"]});
			this.eBand = new portalui_saiCBBL(this,{bound:[20,22,200,20],caption:"Band", multiSelection:false,change:[this,"doChange"]});
			this.eJenis = new portalui_saiLabelEdit(this,{bound:[20,26,200,20],caption:"Jenis Layanan",readOnly:true,text:""});	
			this.eStsPeg = new portalui_saiLabelEdit(this,{bound:[20,28,200,20],caption:"Status Pegawai",readOnly:true,text:""});
			this.eStatus = new portalui_saiCB(this,{bound:[20,27,200,20],caption:"Status",items:["KK","ISU","ANAK","JADU"],tag:"1",change:[this,"doChange"]});
			this.eBiaya = new portalui_saiLabelEdit(this,{bound:[20,28,200,20],caption:"Tarif Pengobatan",tipeText:ttNilai,text:"0"});
			this.eKunj = new portalui_saiLabelEdit(this,{bound:[20,31,200,20],caption:"Tarif Kunjungan",tipeText:ttNilai,text:"0"});
			this.eSC = new portalui_saiLabelEdit(this,{bound:[20,30,200,20],caption:"Tarif Sharing Cost",tipeText:ttNilai,text:"0"});
			
			this.bTampil = new portalui_button(this,{bound:[829,30,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new portalui_panel(this,{bound:[10,31,900,333],caption:"Daftar Tarif"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,280],colCount:11,
					colTitle:["Kd Parameter","Nama Parameter","Jenis","Band","Sts Pegawai","Status","Tarif Pengobatan","Tarif Kunjungan","Tarif Sharing Cost","Tahun Angg.","Kode Lokasi"],
					colWidth:[[0,1,2,3,4,5,6,7,8,9,10],[80,200,80,80,80,80,90,90,90,80,60]],readOnly:true,defaultRow:1});		
					colFormat:[[6,7,8],[cfNilai, cfNilai, cfNilai]],
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,305,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
			this.rearrangeChild(10,23);
			setTipeButton(tbAllFalse);
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
			
			this.eLokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokkonsol='"+this.app._lokKonsol+"'",["kode_lokasi","nama"],undefined,["Kode","Nama"],"and","Data Lokasi",true);						
			this.eBand.setSQL("select kode_band, nama from agg_band ",["kode_band","nama"],undefined,["Kode Band","Nama"],"where","Data Band",true);						
			this.eLokasi.setText(this.app._lokasi);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fBpcctarif.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fBpcctarif.implement({
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
					this.eParam.setText("");					
					this.eBiaya.setText("0"); 
					this.eKunj.setText("0"); 
					this.eSC.setText("0"); 
					break;
				case "simpan" :
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_bpcc_tarif (kode_lokasi,kode_param,jenis_pst,tbiaya,tkunjungan,tsc,tahun,kode_band,status_pst) values "+
						        "('"+this.eLokasi.getText()+"','"+this.eParam.getText()+"','"+this.eStatus.getText()+"',"+parseNilai(this.eBiaya.getText())+","+parseNilai(this.eKunj.getText())+","+parseNilai(this.eSC.getText())+",'"+this.eTahun.getText()+"','"+this.eBand.getText()+"','"+this.eStsPeg.getText()+"')");
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_bpcc_tarif set status_pst='"+this.eStsPeg.getText()+"',kode_band='"+this.eBand.getText()+"',tsc="+parseNilai(this.eSC.getText())+",tbiaya="+parseNilai(this.eBiaya.getText())+",tkunjungan="+parseNilai(this.eKunj.getText())+" "+
						        "where kode_lokasi = '"+this.eLokasi.getText()+"' and tahun='"+this.eTahun.getText()+"' and kode_param= '"+this.eParam.getText()+"' and jenis_pst= '"+this.eStatus.getText()+"'");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from agg_bpcc_tarif "+
						        "where kode_lokasi = '"+this.eLokasi.getText()+"' and tahun='"+this.eTahun.getText()+"' and kode_param= '"+this.eParam.getText()+"' and jenis_pst= '"+this.eStatus.getText()+"'");
						this.dbLib.execArraySQL(sql);											   
					break;
			}
			this.eParam.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doChange: function(sender){
		if (sender == this.eTahun || sender == this.eLokasi) {
			if (this.eTahun.getText()!="" && this.eLokasi.getText()!="")
				this.eParam.setSQL("select kode_param, nama, kode_bpcc, status_pst from agg_bpcc_param where tahun='"+this.eTahun.getText()+"' ",
									["kode_param","nama","kode_bpcc","status_pst"],undefined,["Kode Parameter","Nama","Jenis","Status"],"and","Data Parameter",true);						
		}
		if (sender == this.eParam) {
			if (this.eParam.getText()!="") {
				this.eJenis.setText(this.eParam.dataFromList[2]);
				this.eStsPeg.setText(this.eParam.dataFromList[3]);
			}
		}
		if (sender == this.eLokasi || sender == this.eTahun || sender == this.eBand || sender == this.eStsPeg || sender == this.eParam || sender == this.eStatus) {
			if (this.eLokasi.getText()!="" && this.eTahun.getText()!="" && this.eParam.getText()!="" && this.eStatus.getText()!="" && this.eBand.getText()!="" && this.eStsPeg.getText()!="") {
				this.eBiaya.setText("0"); 
				this.eKunj.setText("0"); 
				this.eSC.setText("0"); 
				
				var data = this.dbLib.getDataProvider(
							 "select tbiaya,tkunjungan,tsc "+
							 "from agg_bpcc_tarif "+
							 "where kode_lokasi = '"+this.eLokasi.getText()+"' and status_pst='"+this.eStsPeg.getText()+"' and kode_band='"+this.eBand.getText()+"' and kode_param = '"+this.eParam.getText()+"' and jenis_pst = '"+this.eStatus.getText()+"' and tahun='"+this.eTahun.getText()+"'");
				eval("data = "+data+";");
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.eBiaya.setText(floatToNilai(line.tbiaya));
						this.eKunj.setText(floatToNilai(line.tkunjungan));
						this.eSC.setText(floatToNilai(line.tsc));
						setTipeButton(tbUbahHapus);
					}
					else{
						setTipeButton(tbSimpan);
					}
				} else setTipeButton(tbSimpan);
			}
		}
	},     
	doTampilClick: function(sender){
		try{			
			if (this.eLokasi.getText() != "" && this.eTahun.getText() != "") {
				var temp = this.dbLib.runSQL("select a.kode_param,b.nama,b.kode_bpcc,a.kode_band,a.status_pst,a.jenis_pst,a.tbiaya,a.tkunjungan,a.tsc,a.tahun,a.kode_lokasi "+
				                             "from agg_bpcc_tarif a inner join agg_bpcc_param b on a.kode_param=b.kode_param and a.tahun=b.tahun "+
											 "where a.kode_lokasi = '"+this.eLokasi.getText()+"' and a.tahun='"+this.eTahun.getText()+"'");
				if (temp instanceof portalui_arrayMap) {
					this.sg1.setData(temp,true,20);
					this.sgn.setTotalPage(this.sg1.pageCount);				
					this.sgn.rearrange();
					this.sgn.activePage = 0;
				}else systemAPI.alert(temp);
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page){
		this.sg1.selectPage(page);
	
	},
	doRequestReady: function(sender, methodName, result){	
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1) {
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.eParam.getText()+")");
						this.app._mainForm.bClear.click();  
					}
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});