window.app_assetsap_master_fKontrak = function(owner)
{
	if (owner)
	{
		window.app_assetsap_master_fKontrak.prototype.parent.constructor.call(this,owner);
		this.className  = "app_assetsap_master_fKontrak";
		this.maximize();
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Kontrak", 0);	
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		try
		{		
			uses("saiCBBL;util_standar;pageControl;datePicker");
			this.ed_kode = new saiCBBL(this, {
				bound: [20, 10, 300, 20],
				caption: "No Kontrak",
				multiSelection:false, 
				rightLabelVisible:false,
				change:[this,"doEditChange"],
				sql:["select no_kontrak, keterangan from amu_kontrak ", ["no_kontrak", "keterangan"], false, ["No Kontrak","Keterangan"], "and", "Daftar Kontrak",false]
			});
			this.ed_nama = new saiLabelEdit(this, {
				bound: [20, 32, 600, 20],
				caption: "Keterangan"
			});			
			this.lbl = new label(this,{bound:[20,0,100,20], caption:"Tgl. Kontrak", underline:true});
			this.dp_tgl = new datePicker(this,{bound:[120,0,100,20]});
			this.cb_vendor = new saiCBBL(this,{bound:[20,1,200,20], caption:"Vendor", multiSelection:false,
				sql: ["select kode_vendor, nama from amu_vendor ",["kode_vendor","nama"],false,["Kode Vendor","Nama"],"and","Daftar Vendor",true]
			 });
			this.pc1 = new pageControl(this,{bound:[20,2, 600,300], childPage: ["Data NKA","Rincian Kontrak"],
				borderColor:"#35aedb", pageChange:[this,"doTabChange"]});
			this.sgnka = new saiGrid(this.pc1.childPage[0],{bound:[0,0,598,270], colCount: 5, 
				colTitle:["No Gabung","NKA","Sub No.","Deskripsi","Alamat"], 
				buttonStyle:[[0],[bsEllips]],
				ellipsClick : [this,"doFindBtnClick"], change:[this,"doChange"],
				colWidth:[[4,3,2,1,0],[200,250,60,100,100]], autoPaging : true, rowPerePage:20, pasteEnable:true, afterPaste:[this,"doAfterPaste"]				
			});
			this.sgn1 = new sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height - 25, 598, 25], borderStyle:3, buttonStyle:bsTransNav, grid:this.sgnka, pager:[this,"doPager"]});
			this.sgdet = new saiGrid(this.pc1.childPage[1],{bound:[0,0,598,270], colCount: 7, 
				colTitle:["Jenis Barang","Jenis Asset","SN","Nilai Perolehan","NMS","MM","SA"],
				colFormat: [[3],[cfNilai]],
				colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,100,100,250]], autoPaging : true, rowPerePage:20, pasteEnable:true, afterPaste:[this,"doAfterPaste"]
			});
			this.sgn2 = new sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height - 25, 598, 25], borderStyle:3, buttonStyle:bsTransNav, grid:this.sgdet, pager:[this,"doPager"]});
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);		
			
			this.ed_kode.onChange.set(this, "doEditChange");
			
			
			this.setTabChildIndex();		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();			
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_assetsap_master_fKontrak.extend(window.childForm);
//------------------------------------------------------------------ event
window.app_assetsap_master_fKontrak.implement({
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
		try{					
			switch (event)
			{
				case "clear" :
					if (modalResult == mrOk)
					{
						this.standarLib.clearByTag(this, new Array("0"),this.ed_kode);				
					}
					break;
				case "simpan" :
					if (modalResult == mrOk)
					{
						
							uses("server_util_arrayList");
							sql = new server_util_arrayList();
							sql.add("insert into amu_kontrak(no_kontrak, keterangan,kode_vendor, tgl_kontrak, nik_user, tgl_input, kode_lokasi)  values "+
									"('"+this.ed_kode.getText()+"','"+this.ed_nama.getText()+"','"+this.cb_vendor.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.app._userLog+"',now(),'"+this.app._lokasi+"')");
							for (var i=0;i< this.sgnka.getRowCount(); i++){
								if (this.sgnka.rowValid(i))
									sql.add("insert into amu_kontrak_nka (no_kontrak, no_gabung, kode_lokasi)values('"+this.ed_kode.getText()+"','"+this.sgnka.cells(0,i)+"','"+this.app._lokasi+"')");
							}
							var nu = 1;
							for (var i=0;i< this.sgdet.getRowCount(); i++){
								if (this.sgdet.rowValid(i)){
									sql.add("insert into amu_kontrak_d (no_kontrak, nu, jenis_brg, jenis_aset, sn,nilai,  nms, mm, sa, kode_lokasi) "+
									" values('"+this.ed_kode.getText()+"','"+nu+"','"+this.sgdet.cells(0,i).replace(/'/gi,"''")+"','"+this.sgdet.cells(1,i)+"','"+this.sgdet.cells(2,i)+"','"+parseNilai(this.sgdet.cells(3,i))+"', '"+this.sgdet.cells(4,i)+"','"+this.sgdet.cells(5,i)+"', '"+this.sgdet.cells(6,i)+"','"+this.app._lokasi+"')");
									nu++;
								}
							}
							this.dbLib.execArraySQL(sql);							
					}
					break;
				case "ubah" :
					if (modalResult == mrOk)
					{
							uses("server_util_arrayList");					
							var sql = new server_util_arrayList();
							
							this.dbLib.execArraySQL(sql);	
					}
					break;
				case "hapus" :
				   if (modalResult == mrOk)
				   {
						uses("server_util_arrayList");					
							var sql = new server_util_arrayList();							
							this.dbLib.execArraySQL(sql);	
				   }
					break;
			}			
		}
		catch(e)
		{
			system.alert(this, e,"");
		}	
	},
	doEditChange: function(sender){		
		if (sender == this.ed_kode) 
		{			
			if (this.ed_kode.getText() != "")
			{
				try
				{						
					var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
							"select keterangan, kode_vendor, date_format(tgl_kontrak,'%d-%m-%Y') as tgl_kontrak from amu_kontrak where no_kontrak = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
							"select a.no_gabung, b.no_fa, b.no_sn, b.nama, b.nama2 from amu_kontrak_nka a inner join amu_asset b on a.no_gabung = b.no_gabung and b.kode_lokasi = a.kode_lokasi and b.periode = '"+this.app._periode+"' ",
							"select jenis_brg, jenis_aset, nilai, sn, nms, mm, sa from amu_kontrak_d where no_kontrak = '"+sender.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' "
						]}),true);
					if (typeof data == 'string'){
						systemAPI.alert(data);
						return;
					}
					var line = data.result[0].rs.rows[0];					
					if (line){
						this.ed_nama.setText(line.keterangan);
						this.cb_vendor.setText(line.kode_vendor);
						this.dp_tgl.setText(line.tgl_kontrak);						
					}
					this.sgnka.clear();
					this.sgdet.clear();
					for (var i in data.result[1].rs.rows){
						line = data.result[1].rs.rows[i];
						this.sgnka.appendData([line.no_gabung, line.no_fa, line.no_sn, line.nama, line.nama2]);
					}
					for (var i in data.result[2].rs.rows){
						line = data.result[2].rs.rows[i];
						this.sgdet.appendData([line.jenis_brg, line.jenis_aset, line.sn, line.nilai, line.nms, line.mm, line.sa]);
					}
				}catch(e){
					systemAPI.alert(e,"");
				}
			}
		} 
	},
	doFindBtnClick: function(sender, col, row){				
		try{
			this.standarLib.showListDataForSG(this, "Daftar Asset SAP",sender, sender.row, sender.col, 
														  "select a.no_gabung, a.no_fa, a.no_sn,a.nama from amu_asset a "+														  
														  " where a.kode_lokasi = '"+this.app._lokasi+"' and a.periode = '"+this.app._periode+"' ",
														  "select count(a.no_fa) from amu_asset a "+														  
														  " where a.kode_lokasi = '"+this.app._lokasi+"' and a.periode = '"+this.app._periode+"' ",//filter hanya untuk MOdem dan IMUX sesuai 
														  ["a.no_gabung","a.nama"],"and",["ID gabung","No Kartu Asset","No SN","Deskripsi Asset"],false);
		}catch(e){
			alert(e);
		}
	},
	doChange: function(sender, col, row){
		if (col == 0){
			var data = this.dbLib.getDataProvider("select no_fa, no_sn, nama, nama2 from amu_asset where no_gabung = '"+sender.cells(0, row)+"' and kode_lokasi = '"+this.app._lokasi+"' and periode = '"+this.app._periode+"'",true);
			if (typeof data == "string"){
				systemAPI.alert(data);
				return;
			}
			var line = data.rs.rows[0];
			if (line){
				sender.cells(1,row, line.no_fa);
				sender.cells(2,row, line.no_sn);
				sender.cells(3,row, line.nama);
				sender.cells(4,row, line.nama2);
			}
		}
		
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			switch	(methodName)
			{
				case "execArraySQL" :
					if (result.toLowerCase().search("error") == -1)					
					{
					  this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nama.getText()+")");
					  this.app._mainForm.bClear.click();              
					}else
						 system.alert(this, result,"");
					break;
			}
		}
	},
	doAfterPaste: function(sender, rowCount, page){
		if (sender == this.sgnka) var sgn = this.sgn1;
		if (sender == this.sgdet) var sgn = this.sgn2;
		sgn.setTotalPage(sender.getTotalPage());
		sgn.rearrange();			
	}
});
