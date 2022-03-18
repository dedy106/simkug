window.app_budget_transaksi_fInvesLoad = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fInvesLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_budget_transaksi_fInvesLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Investasi : Input - Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,22,180,20],tag:2,caption:"Tahun Anggaran",tipeText: ttAngka,maxLength:4,change:[this,"doChange"]});								
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,78,230,20],caption:"No Bukti", readOnly:true});					
		this.bGen = new portalui_button(this,{bound:[256,78,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   								
		this.ePP = new portalui_saiCBBL(this,{bound:[20,100,200,20],caption:"PP", multiSelection:false,tag:2,change:[this,"doChange"]});	
		this.bUpload = new portalui_uploader(this,{bound:[820,100,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,420],caption:"Data Jurnal Investasi"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,370],colCount:17,
				colTitle:["Kode Akun","DC","Nama","Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des","Kode CF","Kode RKA"],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,395,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
	
		this.ePP.setSQL("select kode_pp, nama, kode_bidang from agg_pp where kode_bidang = '4' and kode_lokasi = '"+this.app._lokasi+"' ",["kode_pp","nama","kode_bidang"],false,["Kode","Nama","Bidang"],"and","Data PP",true);
		this.ePP.setText("994000");
		this.kodeBidang = "4";
		
		var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
		eval("data = "+data+";");
		if (typeof data == "object"){
			var line;
			line = data.rs.rows[0];							
			this.eTahun.setText(line.tahun);
		}
		
		setTipeButton(tbSimpan);				
	}
};
window.app_budget_transaksi_fInvesLoad.extend(window.portalui_childForm);
window.app_budget_transaksi_fInvesLoad.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 1000));				
				this.sgn.rearrange();
				this.sgn.activePage = 0;								
			}else throw(data);		
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 1000;
		var finish = start + 1000;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg1.appendData([
			line.kode_akun, line.dc, line.nama, parseFloat(line.jan), parseFloat(line.feb), parseFloat(line.mar), 
			parseFloat(line.apr), parseFloat(line.mei), parseFloat(line.jun), parseFloat(line.jul), parseFloat(line.agu), 
			parseFloat(line.sep), parseFloat(line.okt), parseFloat(line.nov), parseFloat(line.des),line.kode_cf,line.kode_rka]);
		}
		this.sg1.setNoUrut(start);
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(); this.sg1.appendRow(); 
				}
				break;
			case "simpan" :
					
					try{
						this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abaupost_m','no_post',this.app._lokasi+"-INV"+this.eTahun.getText().substr(2,2)+".",'000'));
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();						
						
						sql.add("delete from agg_abaupost_m where keterangan = 'INV' and periode like '"+this.eTahun.getText()+"%'");
						sql.add("delete from agg_gldt where modul = 'INV' and periode like '"+this.eTahun.getText()+"%'");
						sql.add("delete from agg_d where modul = 'INV' and periode like '"+this.eTahun.getText()+"%'");
						
						sql.add("insert into agg_abaupost_m(no_post, kode_lokasi, keterangan, tgl_input, nik_user, periode)"+
								"                    values('"+this.ed_nb.getText()+"','"+this.app._lokKonsol+"','INV',now(), '"+this.app._userLog+"','"+this.eTahun.getText()+"')");
								 
						var idx=0;
						for (var i=0;i< this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								idx++;
								for (var j=1;j< 13;j++){
									var k=j+2;
									if (this.sg1.cells(k,i) != "0") {
										this.periode = this.eTahun.getText() + (j<10?"0":"")+j;
										var tgl = this.eTahun.getText()+"-"+(j<10?"0":"")+j+"-01";
										var nilai = parseFloat(this.sg1.cells(k,i));
										
										if (this.sg1.cells(1,i) == "D") {
											if (nilai < 0) {
												var dc = "C";
												nilai = nilai * -1;
											} else var dc = this.sg1.cells(1,i);
										}
										else {
											if (nilai < 0) {
												var dc = "D";
												nilai = nilai * -1;
											} else var dc = this.sg1.cells(1,i);										
										}
										sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_cf) values "+
												"('"+this.ed_nb.getText()+"',"+idx+",'"+this.app._lokKonsol+"','INV','-','-','"+tgl+"','"+this.sg1.cells(0,i)+"','"+dc+"',"+nilai+",'"+this.sg1.cells(2,i)+"','-','"+this.periode+"','-','IDR',1,"+nilai+",now(),'"+this.app._userLog+"','-','-','-','-','-','-','"+this.sg1.cells(15,i)+"')");
									
										if (this.sg1.cells(16,i) != "-" && this.sg1.cells(16,i) != "") {
											sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) values "+
													"('99','"+this.sg1.cells(16,i).substr(0,7)+"','"+this.sg1.cells(16,i).substr(0,9)+"','"+this.sg1.cells(16,i)+"','"+this.sg1.cells(0,i)+"','994000','"+this.periode+"','"+this.periode.substr(4,2)+"',1,1,"+nilai+",'"+this.eTahun.getText()+"','"+this.ed_nb.getText()+"','INV','0','E','"+this.sg1.cells(2,i)+"') ");
										}
									}
								
								}
							}
						}
						
						sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
								"select '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','INV','KOMA','-',substring(periode,1,4)+'-'+substring(periode,5,2)+'-01','5402000002',case when sum(case dc when 'D' then nilai else -nilai end)<0 then 'D' else 'C' end,abs(sum(case dc when 'D' then nilai else -nilai end)),'-','-',periode,'-','IDR',1,abs(sum(case dc when 'D' then nilai else -nilai end)),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
								"from agg_gldt where periode like '"+this.eTahun.getText()+"%'  and modul ='INV' group by periode");

						this.dbLib.execArraySQL(sql);
					}catch(e){
						systemAPI.alert(e);
					}
				break;
		}
	},
	doChange: function(sender)	{
		if (sender == this.ePP && this.ePP.getText()!="") {
			this.kodeBidang = this.ePP.dataFromList[2];
		}
	},
	doClick: function(sender){
		if (sender == this.bGen)
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abaupost_m','no_post',this.app._lokasi+"-INV"+this.eTahun.getText().substr(2,2)+".",'000'));
		if (sender == this.bRefresh) {			
			this.sg1.clear(1);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.ed_nb.getText()+")");
						this.app._mainForm.bClear.click();              
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	}
});
