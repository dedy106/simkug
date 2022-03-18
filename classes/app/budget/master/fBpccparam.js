/**
 * @author mr
 */
window.app_budget_master_fBpccparam = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fBpccparam.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fBpccparam";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Parameter Jenis Layanan", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;util_standar");			
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,25,180,20],caption:"Tahun",maxLength:4,change:[this,"doEditChange"],tag:5});
			this.e0 = new portalui_saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Parameter", multiSelection:false,change:[this,"doEditChange"],tag:"1",rightLabelVisible:false});					
			this.eNama = new portalui_saiLabelEdit(this,{bound:[20,22,400,20],caption:"Nama",tag:"2"});				
			this.eStsPeg = new portalui_saiCB(this,{bound:[20,28,200,20],caption:"Status Pegawai",items:["PEGAWAI","PENSIUN"],tag:"1"});
			this.eJenis = new portalui_saiCBBL(this,{bound:[20,24,200,20],caption:"Kode Layanan",multiSelection:false,tag:"2"});	
			this.eAkun = new portalui_saiCBBL(this,{bound:[20,23,200,20],caption:"Kode Akun Biaya",multiSelection:false,tag:"2"});	
			this.eRka = new portalui_saiCBBL(this,{bound:[20,26,200,20],caption:"Kode RKA Biaya",multiSelection:false,tag:"2"});			
			this.eAkun2 = new portalui_saiCBBL(this,{bound:[20,27,200,20],caption:"Akun Kunjungan",multiSelection:false,tag:"2"});	
			this.eRka2 = new portalui_saiCBBL(this,{bound:[20,28,200,20],caption:"RKA Kunjungan",multiSelection:false,tag:"2"});			
			this.eAkun3 = new portalui_saiCBBL(this,{bound:[20,29,200,20],caption:"Akun Sharing Cost",multiSelection:false,tag:"2"});	
			this.eRka3 = new portalui_saiCBBL(this,{bound:[20,28,200,20],caption:"RKA Sharing Cost",multiSelection:false,tag:"2"});			
			
			this.bTampil = new portalui_button(this,{bound:[829,28,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			
			this.p1 = new portalui_panel(this,{bound:[10,27,900,333],caption:"Daftar Parameter Layanan"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,285],tag:16,
					colTitle: ["Kd Parameter","Nama Parameter","Status Peg.","Layanan","Akun Biaya","Nama Akun","RKA Biaya","Nama RKA","Akun Kunj","Nama Akun","RKA Kunj","Nama RKA","Akun SC","Nama Akun","RKA SC","Nama RKA"]});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,310,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"],tag:"9"});		

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
			
			this.eAkun.setSQL("select kode_akun, nama from agg_masakun where kode_lokasi='"+this.app._lokasi+"' ",["kode_akun","nama"],undefined,["Kode Akun","Nama"],"and","Data Akun",true);			
			this.eAkun2.setSQL("select kode_akun, nama from agg_masakun where kode_lokasi='"+this.app._lokasi+"' ",["kode_akun","nama"],undefined,["Kode Akun","Nama"],"and","Data Akun",true);			
			this.eAkun3.setSQL("select kode_akun, nama from agg_masakun where kode_lokasi='"+this.app._lokasi+"' ",["kode_akun","nama"],undefined,["Kode Akun","Nama"],"and","Data Akun",true);			
			this.eJenis.setSQL("select kode_bpcc, nama from agg_bpcc_jenis ",["kode_bpcc","nama"],undefined,["Kode Layanan","Nama"],"where","Data Layanan",true);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fBpccparam.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fBpccparam.implement({
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
					this.standarLib.clearByTag(this, new Array("1"),this.e0);
					this.sg1.clear(1);
					setTipeButton(tbAllFalse);											
					break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this, [0,1,2,3]))
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();												
						sql.add("insert into agg_bpcc_param (kode_param, nama, kode_bpcc, kode_akun, kode_rka, kode_akun2, kode_rka2,  kode_akun3, kode_rka3,tahun,status_pst) "+
						        "values ('"+this.e0.getText()+"','"+this.eNama.getText()+"','"+this.eJenis.getText()+"','"+this.eAkun.getText()+"','"+this.eRka.getText()+"','"+this.eAkun2.getText()+"','"+this.eRka2.getText()+"','"+this.eAkun3.getText()+"','"+this.eRka3.getText()+"','"+this.eTahun.getText()+"','"+this.eStsPeg.getText()+"')");
						this.dbLib.execArraySQL(sql);		
						this.standarLib.clearByTag(this, new Array("1","2"),this.e0);
					}
					break;
				case "ubah" :	
					if (this.standarLib.checkEmptyByTag(this, [0,1,2]))
					{
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_bpcc_param set status_pst = '"+this.eStsPeg.getText()+"', kode_bpcc = '"+this.eJenis.getText()+"', nama = '"+this.eNama.getText()+"',kode_akun='"+this.eAkun.getText()+"',kode_rka='"+this.eRka.getText()+"',kode_akun2='"+this.eAkun2.getText()+"',kode_rka2='"+this.eRka2.getText()+"',kode_akun3='"+this.eAkun3.getText()+"',kode_rka3='"+this.eRka3.getText()+"'  "+
								"where kode_param = '"+this.e0.getText()+"' and tahun = '"+this.eTahun.getText()+"'");
						this.dbLib.execArraySQL(sql);							
						this.standarLib.clearByTag(this, new Array("1","2"),this.e0);
					}
					break;
				case "hapus" :
				    uses("server_util_arrayList");
					sql = new server_util_arrayList();
					sql.add("delete from  agg_bpcc_param where kode_param = '"+this.e0.getText()+"' and tahun = '"+this.eTahun.getText()+"'");
					this.dbLib.execArraySQL(sql);									
					this.standarLib.clearByTag(this, new Array("1","2"),this.e0);
					break;
			}
			this.e0.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doEditChange: function(sender){
		if (sender == this.eTahun || sender == this.cJenis) {
			if (this.eTahun.getText()!="") {
				this.e0.setSQL("select kode_param, nama from agg_bpcc_param where tahun = '"+this.eTahun.getText()+"'  ",["kode_param","nama"],undefined,["Kode Parameter","Nama"],"and","Data Parameter",false);
				this.eRka.setSQL("select kode_rka, nama from agg_rka where tahun = '"+this.eTahun.getText()+"' ",["kode_rka","nama"],undefined,["Kode RKA","Nama"],"and","Data RKA",true);				
				this.eRka2.setSQL("select kode_rka, nama from agg_rka where tahun = '"+this.eTahun.getText()+"' ",["kode_rka","nama"],undefined,["Kode RKA","Nama"],"and","Data RKA",true);				
				this.eRka3.setSQL("select kode_rka, nama from agg_rka where tahun = '"+this.eTahun.getText()+"' ",["kode_rka","nama"],undefined,["Kode RKA","Nama"],"and","Data RKA",true);				
			}
		}
		if(sender == this.e0){
			if (this.e0.getText() != ""){
				try{			
					this.standarLib.clearByTag(this, new Array("2"),this.e0);
					var sql="select a.kode_param,a.nama as nama_param,a.kode_bpcc,c.nama as nama_bpcc,a.kode_akun,b.nama as nama_akun,a.kode_rka,d.nama as nama_rka,a.kode_akun2,x.nama as nama_akun2,a.kode_rka2,y.nama as nama_rka2,a.kode_akun3,xx.nama as nama_akun3,a.kode_rka3,yy.nama as nama_rka3,a.status_pst "+
							"from agg_bpcc_param a "+
							"	inner join agg_masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi='"+this.app._lokasi+"' "+
							"	inner join agg_bpcc_jenis c on a.kode_bpcc=c.kode_bpcc and a.tahun='"+this.eTahun.getText()+"' "+ 
							"	inner join agg_rka d on a.kode_rka=d.kode_rka and a.tahun=d.tahun "+ 
							"	inner join agg_masakun x on a.kode_akun2=x.kode_akun and x.kode_lokasi='"+this.app._lokasi+"' "+
							"	inner join agg_rka y on a.kode_rka2=y.kode_rka and a.tahun=y.tahun "+ 
							"	inner join agg_masakun xx on a.kode_akun3=xx.kode_akun and xx.kode_lokasi='"+this.app._lokasi+"' "+
							"	inner join agg_rka yy on a.kode_rka3=yy.kode_rka and a.tahun=yy.tahun "+ 
							"where a.kode_param='"+this.e0.getText()+"' and a.tahun='"+this.eTahun.getText()+"' ";
					var data = this.dbLib.getDataProvider(sql,true);			
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){
							this.eNama.setText(line.nama_param);
							this.eStsPeg.setText(line.status_pst);
							this.eAkun.setText(line.kode_akun,line.nama_akun);
							this.eAkun2.setText(line.kode_akun2,line.nama_akun2);
							this.eAkun3.setText(line.kode_akun3,line.nama_akun3);
							this.eJenis.setText(line.kode_bpcc,line.nama_bpcc);
							this.eRka.setText(line.kode_rka,line.nama_rka);
							this.eRka2.setText(line.kode_rka2,line.nama_rka2);
							this.eRka3.setText(line.kode_rka3,line.nama_rka3);
							setTipeButton(tbUbahHapus);
						}
						else{
							setTipeButton(tbSimpan);
						}
					}				
				}catch(e){
					system.alert(this, e,"");
				}
			}
		}
	},	
	doTampilClick: function(sender){
		try{													
			var temp = this.dbLib.runSQL("select a.kode_param,a.nama as nama_param,a.status_pst,a.kode_bpcc,a.kode_akun,b.nama as nama_akun,a.kode_rka,d.nama as nama_rka,a.kode_akun2,x.nama as nama_akun2,a.kode_rka2,y.nama as nama_rka2,a.kode_akun3,xx.nama as nama_akun3,a.kode_rka3,yy.nama as nama_rka3 "+
			                            "from agg_bpcc_param a "+
										"	inner join agg_masakun b on a.kode_akun=b.kode_akun and b.kode_lokasi='"+this.app._lokasi+"' "+
										"	inner join agg_rka d on a.kode_rka=d.kode_rka and a.tahun=d.tahun "+ 
										"	inner join agg_masakun x on a.kode_akun2=x.kode_akun and x.kode_lokasi='"+this.app._lokasi+"' "+
										"	inner join agg_rka y on a.kode_rka2=y.kode_rka and a.tahun=y.tahun "+ 
										"	inner join agg_masakun xx on a.kode_akun3=xx.kode_akun and xx.kode_lokasi='"+this.app._lokasi+"' "+
										"	inner join agg_rka yy on a.kode_rka2=yy.kode_rka and a.tahun=yy.tahun "+ 
										"where a.tahun='"+this.eTahun.getText()+"' "+
										"order by a.kode_param");
			if (temp instanceof portalui_arrayMap) {
				this.sg1.setData(temp,true,20);
				this.sgn.setTotalPage(this.sg1.pageCount);				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
			
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
					if (result.toLowerCase().search("error") == -1)
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.e0.getText()+")");
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});