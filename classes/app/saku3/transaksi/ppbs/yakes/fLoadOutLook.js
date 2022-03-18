window.app_saku3_transaksi_ppbs_yakes_fLoadOutLook = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_ppbs_yakes_fLoadOutLook.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_ppbs_yakes_fLoadOutLook";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Data Anggaran,Realisasi dan Outlook : Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 
		this.c_bulan = new saiCB(this,{bound:[20,22,150,20],caption:"Bulan",items:["01","02","03","04","05","06","07","08","09","10","11","12"], readOnly:true,tag:2});
		this.cb_bidang = new saiCBBL(this,{bound:[20,11,200,20],caption:"Bidang", multiSelection:false, maxLength:10, tag:2});				
		this.bUpload = new portalui_uploader(this,{bound:[820,11,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.p1 = new portalui_panel(this,{bound:[20,189,900,400],caption:"Data Anggaran,Realisasi dan Outlook"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:7,tag:0,
				colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","RKA","Realisasi","Outlook"],
				colWidth:[[6,5,4,3,2,1,0],[100,100,100,100,80,100,80]],
				colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"selectPage"]});		
		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
				
		setTipeButton(tbSimpan);		
		this.setTabChildIndex();				
		
		var tahun = parseFloat(this.dp_d1.year);
		this.e_tahun.setText(tahun);
		
		this.tahunGar = tahun+1;
		
		if (this.app._userStatus=="A")
			this.cb_bidang.setSQL("select kode_bidang, nama from bidang",["kode_bidang","nama"],false,["Kode","Nama"],"where","Daftar Bidang",true);		
		else this.cb_bidang.setSQL("select kode_bidang, nama from bidang where kode_bidang='"+this.app._kodeBidang+"'",["kode_bidang","nama"],false,["Kode","Nama"],"and","Daftar Bidang",true);		
	    this.c_bulan.setText("07");	
		
		var data = this.dbLib.getDataProvider("select kode_spro,value1 from spro where kode_spro in ('MAXPPBS') and kode_lokasi = '"+this.app._lokasi+"'",true);			
		if (typeof data == "object"){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];	
				if (line.kode_spro == "MAXPPBS") this.maxPPBS = parseFloat(line.value1);
			}
		}
		
	}
};
window.app_saku3_transaksi_ppbs_yakes_fLoadOutLook.extend(window.portalui_childForm);
window.app_saku3_transaksi_ppbs_yakes_fLoadOutLook.implement({	
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));
				this.sgn.rearrange();
				this.sgn.activePage = 0;	
			}else throw(data);					
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		var start = (page - 1) * 20;
		var finish = start + 20;
		finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
		this.sg1.clear();
		for (var i=start; i < finish;i++){
			line = this.dataUpload.rows[i];
			this.sg1.appendData([line.kode_akun,"-",line.kode_pp,"-",floatToNilai(line.rka),floatToNilai(line.realisasi),floatToNilai(line.outlook)]);
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
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				}
				break;
			case "simpan" :			
					/*
					var strSQL = "select kode_akun from agg_d "+								 
								 "where tahun = '"+this.tahunGar+"' and kode_lokasi='"+this.app._lokasi+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							system.alert(this,"Transaksi tidak valid.","Data Outlook sudah terpakai transaksi.");
							return false;
						}
					}
					*/
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();																						
							sql.add("delete from agg_outlook where kode_bidang = '"+this.cb_bidang.getText()+"' and kode_lokasi = '"+this.app._lokasi+"' and tahun = '"+this.e_tahun.getText()+"'");
							
							var line;							
							var dc = ""; var estimasi=rka=realisasi=outlook=0;							
							//sql.add("update agg_close set progress ='0' where kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.tahunGar+"'");
							
							for (var i=0; i < this.dataUpload.rows.length;i++){
								line = this.dataUpload.rows[i];						
								//sql.add("update agg_outlook set gar_sem1=rka,rka="+parseFloat(line.rka)+",rseb=realisasi,realisasi="+parseFloat(line.realisasi)+",outlook="+parseFloat(line.outlook)+" where kode_akun='"+line.kode_akun+"' and kode_pp='"+line.kode_pp+"' and periode='"+this.e_tahun.getText()+this.c_bulan.getText()+"'");
								//sql.add("update agg_outlook set estimasi=outlook-realisasi where kode_akun='"+line.kode_akun+"' and kode_pp='"+line.kode_pp+"' and periode='"+this.e_tahun.getText()+this.c_bulan.getText()+"'");								
								
								if (line.kode_akun.substr(0,1) == "4") dc = "C"; else dc = "D";
								rka = parseFloat(line.rka);
								realisasi = parseFloat(line.realisasi);
								outlook = parseFloat(line.outlook);
								estimasi = parseFloat(line.outlook) - parseFloat(line.realisasi);
								
								/*
								if (outlook > rka && line.kode_akun.substr(0,6) != "110503" && line.kode_akun.substr(0,6) != "610102") {
									outlook = rka;
									estimasi = outlook - realisasi;
								}
								*/
								
								//if (line.kode_akun != "51040105") {
								sql.add("insert into agg_outlook(kode_lokasi,kode_bidang,kode_akun,kode_pp,rka,realisasi,outlook,tahun,dc,gar_sem1,gar_sem2,rseb,rnow,estimasi,periode,persen) values "+
										"('"+this.app._lokasi+"','"+this.cb_bidang.getText()+"','"+line.kode_akun+"','"+line.kode_pp+"',"+rka+","+realisasi+","+outlook+",'"+this.e_tahun.getText()+"','"+dc+"',"+rka+",0,"+realisasi+",0,"+estimasi+",'"+this.e_tahun.getText()+this.c_bulan.getText()+"',"+this.maxPPBS+")");
								
								/*
								}
								else { //akun pembinaan di open
									sql.add("insert into agg_outlook(kode_lokasi,kode_bidang,kode_akun,kode_pp,rka,realisasi,outlook,tahun,dc,gar_sem1,gar_sem2,rseb,rnow,estimasi,periode,persen) values "+
											"('"+this.app._lokasi+"','"+this.cb_bidang.getText()+"','"+line.kode_akun+"','"+line.kode_pp+"',"+rka+","+realisasi+","+outlook+",'"+this.e_tahun.getText()+"','"+dc+"',"+rka+",0,"+realisasi+",0,"+estimasi+",'"+this.e_tahun.getText()+this.c_bulan.getText()+"',10000)");
								}
								*/
							}															
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
							setTipeButton(tbSimpan);
						}
					}
				break;
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){
						this.app._mainForm.pesan(2,"Transaksi Sukses tersimpan");
						this.app._mainForm.bClear.click();              
					}else {
						system.info(this, result,"");											
						setTipeButton(tbSimpan);
					}
				break;
			}
		}		
	}
});
