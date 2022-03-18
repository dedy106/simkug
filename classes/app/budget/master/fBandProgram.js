/**
 * @author dweexfuad,dedy,mr
 */
window.app_budget_master_fBandProgram = function(owner)
{
	if (owner)
	{
		window.app_budget_master_fBandProgram.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_master_fBandProgram";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Program SPPD per Band", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("panel;saiGrid;sgNavigator;saiLabelEdit;button;saiCB;saiCBBL;util_standar;label");
			this.eLokasi = new portalui_saiCBBL(this,{bound:[20,11,200,20],caption:"Lokasi", multiSelection:false,tag:2,change:[this,"doEditChange"]});	
			this.eTahun = new saiLabelEdit(this,{bound:[20,19,180,20], caption:"Tahun",tipeText:ttAngka,maxLength:4,change:[this,"doEditChange"]});
			this.eBand = new saiCBBL(this,{bound:[20,20,200,20],caption:"Kode Band", multiSelection:false,change:[this,"doEditChange"]});				
			this.eProgram = new saiCBBL(this,{bound:[20,21,200,20],caption:"Kode Program", multiSelection:false,change:[this,"doEditChange"]});				
			this.eRka = new saiCBBL(this,{bound:[20,22,200,20],caption:"Kode RKA", multiSelection:false,change:[this,"doEditChange"]});				
			this.eKet = new portalui_saiLabelEdit(this,{bound:[20,24,400,20],caption:"Keterangan",maxLength:150});
			this.eFrek = new saiLabelEdit(this,{bound:[20,22,180,20], caption:"Frekuensi",tipeText:ttNilai,text:"0",change:[this,"doChange"]}); //, mustCheck:false,items:["01","02","03","04","05","06","07","08","09","10","11","12","A. 01,04,07,10","B. 01, 07", "C. 01-12", "D. 01,05,09"]
			this.eHari = new saiLabelEdit(this,{bound:[20,23,180,20], caption:"Jml Hari/SPPD",tipeText:ttNilai,text:"0",change:[this,"doChange"]});
			this.eJml = new saiLabelEdit(this,{bound:[20,25,180,20], caption:"Jumlah Lokasi",tipeText:ttNilai,text:"0",change:[this,"doChange"]});
			this.eTotal = new saiLabelEdit(this,{bound:[20,24,180,20], caption:"Total Hari",readOnly:true,tipeText:ttNilai,text:"0"});
			
			this.bTampil = new button(this,{bound:[729,24,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new panel(this,{bound:[10,23,800,260],caption:"Daftar Program SPPD per Band"});
			this.sg1 = new saiGrid(this.p1,{bound:[0,20,800,210],tag:"9",
					colTitle:"Band,Kode Program,Nama Program,Kode RKA, Nama RKA, Tahun,Keterangan,frekuensi,Hari,Jumlah,Total"});		
			this.sgn = new sgNavigator(this.p1,{bound:[0,235,800,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"]});		

			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();		
			
			this.eLokasi.setSQL("select kode_lokasi, nama from lokasi where kode_lokkonsol = '"+this.app._lokKonsol+"' ",["kode_lokasi","nama"],false,["Kode","Nama"],"and","Data Bisnis Area",true);
			this.eLokasi.setText(this.app._lokasi);			
			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}
			this.eBand.setSQL("select kode_band, nama from agg_band",["kode_band","nama"],false,["Kode Band","Nama"]," where ","Data Band",true);			

		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_master_fBandProgram.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_master_fBandProgram.implement({
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
					this.eProgram.setText("");
					this.eHari.setText("0");
					this.eJml.setText("0");									
					this.eTotal.setText("0");									
					break;
				case "simpan" :
						uses("server_util_arrayList");
						sql = new server_util_arrayList(); 
						sql.add("insert into agg_program_band (kode_program,kode_band,kode_lokasi,frek,hari,jumlah,total,tahun,keterangan) values "+
								"('"+this.eProgram.getText()+"','"+this.eBand.getText()+"','"+this.eLokasi.getText()+"','"+parseNilai(this.eFrek.getText())+"',"+parseNilai(this.eHari.getText())+","+parseNilai(this.eJml.getText())+","+parseNilai(this.eTotal.getText())+",'"+this.eTahun.getText()+"','"+this.eKet.getText()+"')");
						this.dbLib.execArraySQL(sql);					
					break;
				case "ubah" :					
						uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("update agg_program_band set total="+parseNilai(this.eTotal.getText())+",jumlah="+parseNilai(this.eJml.getText())+",hari="+parseNilai(this.eHari.getText())+",frek='"+parseNilai(this.eFrek.getText())+"',keterangan='"+this.eKet.getText()+
								"' where kode_band='"+this.eBand.getText()+"' and tahun='"+this.eTahun.getText()+"' and kode_program='"+this.eProgram.getText()+"' and kode_lokasi='"+this.eLokasi.getText()+"' ");
						this.dbLib.execArraySQL(sql);							
					break;
				case "hapus" :
				    uses("server_util_arrayList");
						sql = new server_util_arrayList();
						sql.add("delete from agg_program_band  where kode_band='"+this.eBand.getText()+"' and tahun='"+this.eTahun.getText()+"' and kode_program='"+this.eProgram.getText()+"' and kode_lokasi='"+this.eLokasi.getText()+"' ");
						this.dbLib.execArraySQL(sql);											   
					break;
			}
			this.eTahun.setFocus();
		}catch(e){
			system.alert(this, e,"");
		}
	},
	doChange: function(sender){
		if (sender  == this.eFrek || sender  == this.eHari || sender  == this.eJml ) {
			/*
			var jBln = 0;
			if (this.eFrek.getText().substr(0,1)=="A") jBln = 4;
			else {
				if (this.eFrek.getText().substr(0,1)=="B") jBln = 2;
				else {
					if (this.eFrek.getText().substr(0,1)=="C") jBln = 12;
					else {
						if (this.eFrek.getText().substr(0,1)=="D") jBln = 3;
						else jBln = 1;
					}
				} 
			}
			*/
			this.eTotal.setText(floatToNilai(nilaiToFloat(this.eHari.getText()) * nilaiToFloat(this.eJml.getText()) * nilaiToFloat(this.eFrek.getText())));
		}
	},
	doEditChange: function(sender){
		if (sender == this.eTahun) {
			if (this.eTahun.getText() != "") {
				this.eRka.setSQL("select kode_rka, nama from agg_rka where tahun = '"+this.eTahun.getText()+"' ",["kode_rka","nama"],false,["Kode RKA","Nama"],"and","Data RKA",true);
			}
		}
		if (sender == this.eLokasi || sender == this.eTahun) {
			if (this.eLokasi.getText() != "" && this.eTahun.getText() != "") {
				this.eProgram.setSQL("select kode_program, nama from agg_program where kode_lokasi='"+this.eLokasi.getText()+"' and tahun = '"+this.eTahun.getText()+"' ",["kode_program","nama"],false,["Kode Program","Nama"],"and","Data Program SPPD",true);				
			}
		}
		if(sender == this.eLokasi || sender == this.eBand || sender == this.eProgram){
			if (this.eLokasi.getText() != "" && this.eBand.getText() != "" && this.eProgram.getText() != ""){
				try{			
					var data = this.dbLib.runSQL("select a.keterangan,a.frek,a.hari,a.jumlah,a.total,a.kode_rka,b.nama as nama_rka "+
												 "from agg_program_band a inner join agg_rka b on a.kode_rka=b.kode_rka and a.tahun=b.tahun "+
												 "where a.tahun = '"+this.eTahun.getText()+"' and a.kode_band='"+this.eBand.getText()+"' and a.kode_program = '"+this.eProgram.getText()+"' and a.kode_lokasi = '"+this.eLokasi.getText()+"'");
					if (data instanceof portalui_arrayMap){				
						if (data.get(0) != undefined){
							this.eRka.setText(data.get(0).get("kode_rka"),data.get(0).get("nama_rka"));
							this.eKet.setText(data.get(0).get("keterangan"));
							this.eFrek.setText(floatToNilai(data.get(0).get("frek")));
							this.eHari.setText(floatToNilai(data.get(0).get("hari")));
							this.eJml.setText(floatToNilai(data.get(0).get("jumlah")));
							this.eTotal.setText(floatToNilai(data.get(0).get("total")));
							setTipeButton(tbUbahHapus);
						}else setTipeButton(tbSimpan);
					}else
						setTipeButton(tbSimpan);					
				}catch(e){
					system.alert(this, e,"");
				}
			}
		}
	},	
	doTampilClick: function(sender){
		try{			
			if (this.eLokasi.getText()!="" && this.eTahun.getText()!="") {
				//Band,Kode Program,Nama Program,Tahun,Keterangan,frekuensi,Hari,Jumlah,Total
				var temp = this.dbLib.runSQL("select a.kode_band,a.kode_program,b.nama,a.kode_rka,c.nama as nama_rka,a.tahun,a.keterangan,a.frek,a.hari,a.jumlah,a.total "+
											"from agg_program_band a inner join agg_program b on a.kode_program=b.kode_program and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun "+
											"                        left join agg_rka c on a.kode_rka=c.kode_rka and a.kode_lokasi='"+this.eLokasi.getText()+"' and a.tahun=c.tahun "+
											"where a.kode_lokasi='"+this.eLokasi.getText()+"' and a.tahun = '"+this.eTahun.getText()+"' order by a.kode_band,a.kode_program");
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
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.eTahun.getText()+")");
						this.eProgram.setText("");
						this.eHari.setText("0");
						this.eJml.setText("0");									
						this.eTotal.setText("0");									
					}
					else this.app._mainForm.pesan(0, result); 
					break;
			}
		}
	}
});
