/**
 * @author dweexfuad, mr
 */
window.app_budget_master_fNormaVar = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fNormaVar.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fNormaVar";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Norma Biaya Variabel : Input/Koreksi", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar;portalui_saiTable");
			this.eVar = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Biaya", multiSelection:false,change:[this,"doChange"]});
			this.eAkun = new portalui_saiCBBL(this,{bound:[20,22,200,20],caption:"Kode Akun", multiSelection:false,change:[this,"doChange"]});
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],caption:"Tahun Anggaran",tipeText:ttAngka,maxLength:4,change:[this,"doChange"]});					
			this.eKeg = new portalui_saiLabelEdit(this,{bound:[20,24,500,20],caption:"Kegiatan"});
			this.eSat = new portalui_saiLabelEdit(this,{bound:[20,25,200,20],caption:"Satuan"});									
			this.eTarif = new portalui_saiLabelEdit(this,{bound:[20,26,200,20],caption:"Tarif",tipeText:ttNilai,text:"0"});
			this.ePnj = new portalui_saiLabelEdit(this,{bound:[20,27,500,20], caption:"Png Jawab Bidang"});			
			this.ePP1 = new portalui_saiLabelEdit(this,{bound:[20,28,500,20], caption:"Angg. Bidang"});			
			this.ePP2 = new portalui_saiLabelEdit(this,{bound:[20,29,500,20], caption:"Pel. Pengadaan"});			
			this.eKet = new portalui_saiLabelEdit(this,{bound:[20,30,500,20], caption:"Keterangan"});			
			
			this.eTahun2 = new portalui_saiLabelEdit(this,{bound:[20,31,200,20],caption:"Tahun Angg. [N-1]",maxLength:4,readOnly:true});								
			this.ePersen = new portalui_saiLabelEdit(this,{bound:[20,32,200,20],caption:"% Kenaikan", tipeText:ttNilai, text:"0",Tag:9});
			this.i_viewer = new portalui_imageButton(this,{bound:[220,32,20,20],hint:"Copy dan Simpan Data Norma Var Biaya Tahun Angg. [N-1] dgn % Kenaikan Tarif",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doCopy"]});
			
			this.bTampil = new portalui_button(this,{bound:[829,32,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new portalui_panel(this,{bound:[10,31,900,333],caption:"Daftar"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,280],colCount:9,
			        colTitle:["Kode Biaya","Keterangan","Kode Akun","Nama Akun","Satuan","Tarif","Tahun Angg.","Png Jawab","Angg. Bidang","Pelaksana","Keterangan"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[80,200,80,200,60,100,100,100,100]],readOnly:true,defaultRow:1});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,302,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		
			this.rearrangeChild(10,23);
			setTipeButton(tbAllFalse);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();					
			
			this.eVar.setSQL("select kode_var, nama from agg_var ",["kode_var","nama"],false,["Kode Biaya","Nama"],"where","Data Variabel Biaya",true);
			this.eAkun.setSQL("select kode_akun, nama from agg_masakun where kode_lokasi = '"+this.app._lokasi+"' ",["kode_akun","nama"],false,["Kode Akun","Nama"],"and","Data Akun",true);
			
			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}

		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fNormaVar.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fNormaVar.implement({
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
					this.eVar.setText("");					
					this.eAkun.setText(""); 
					this.eKeg.setText(""); 
					this.eKet.setText(""); 
					this.eTarif.setText("0");												
					break;
				case "simpan" :
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("insert into agg_norma_var (kode_var,kode_akun,kegiatan,satuan,tarif,png_jawab,kode_pp,pelaksana,keterangan,tahun,jml_sat) values "+
						        "('"+this.eVar.getText()+"','"+this.eAkun.getText()+"','"+this.eKeg.getText()+"','"+this.eSat.getText()+"',"+parseNilai(this.eTarif.getText())+",'"+this.ePnj.getText()+"','"+this.ePP1.getText()+"','"+this.ePP2.getText()+"','"+this.eKet.getText()+"','"+this.eTahun.getText()+"',1)");
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_norma_var set kegiatan='"+this.eKeg.getText()+"',satuan='"+this.eSat.getText()+"',tarif="+parseNilai(this.eTarif.getText())+",png_jawab='"+this.ePnj.getText()+"',kode_pp='"+this.ePP1.getText()+"',pelaksana='"+this.ePP2.getText()+"',keterangan='"+this.eKet.getText()+"',jml_sat=1 "+
						        "where tahun='"+this.eTahun.getText()+"' and kode_var= '"+this.eVar.getText()+"' and kode_akun= '"+this.eAkun.getText()+"' ");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from agg_norma_var "+
						        "where tahun='"+this.eTahun.getText()+"' and kode_var= '"+this.eVar.getText()+"' and kode_akun= '"+this.eAkun.getText()+"'");
						this.dbLib.execArraySQL(sql);											   
					break;
			}
			this.eVar.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doCopy: function(sender) {
		if (this.eTahun2.getText()!="") {
			uses("server_util_arrayList");
			sql = new server_util_arrayList();
			sql.add("delete from agg_norma_var where tahun = '"+this.eTahun.getText()+"'");
			var vPersen = (nilaiToFloat(this.ePersen.getText()) +100) /100;
			sql.add("insert into agg_norma_var (kode_var,kode_akun,kegiatan,satuan,tarif,png_jawab,kode_pp,pelaksana,keterangan,tahun,jml_sat) "+
					"select kode_var,kode_akun,kegiatan,satuan,round("+vPersen+"*tarif,0) as tarif,png_jawab,kode_pp,pelaksana,keterangan,'"+this.eTahun.getText()+"',jml_sat "+
					"from agg_norma_var where tahun='"+this.eTahun2.getText()+"'");									
			this.dbLib.execArraySQL(sql);			
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.eTahun && this.eTahun.getText()!="") {
				this.eTahun2.setText(parseFloat(this.eTahun.getText())-1);
			}
			if (sender == this.eVar || sender == this.eAkun || sender == this.eTahun) {
				if (this.eVar.getText() != "" && this.eAkun.getText() != "" && this.eTahun.getText() != ""){
					var data = this.dbLib.getDataProvider("select kegiatan,satuan,tarif,png_jawab,kode_pp,pelaksana,keterangan from agg_norma_var "+
							   "where kode_var='"+this.eVar.getText()+"' and kode_akun='"+this.eAkun.getText()+"' and tahun='"+this.eTahun.getText()+"'",true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.eKeg.setText(line.kegiatan);
							this.eSat.setText(line.satuan);
							this.eTarif.setText(floatToNilai(line.tarif));
							this.ePnj.setText(line.png_jawab);
							this.ePP1.setText(line.kode_pp);
							this.ePP2.setText(line.pelaksana);
							this.eKet.setText(line.keterangan);
							setTipeButton(tbUbahHapus);
						}
						else{
							setTipeButton(tbSimpan);
						}
					} else setTipeButton(tbSimpan);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},       
	doTampilClick: function(sender){
		try{			
			if (this.eTahun.getText() != "") {
				var temp = this.dbLib.runSQL("select a.kode_var,b.nama as nama_var,a.kode_akun,c.nama as nama_akun,a.satuan,round(a.tarif,0) as tarif,a.tahun,a.png_jawab,a.kode_pp,a.pelaksana,a.keterangan "+
				                             "from agg_norma_var a inner join agg_var b on a.kode_var=b.kode_var "+
											 "                     inner join agg_masakun c on a.kode_akun=c.kode_akun and c.kode_lokasi='"+this.app._lokasi+"' "+
											 "where a.tahun='"+this.eTahun.getText()+"'");
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
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.eVar.getText()+")");
						this.app._mainForm.bClear.click();  
					}
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});