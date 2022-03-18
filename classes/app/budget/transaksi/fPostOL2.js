window.app_budget_transaksi_fPostOL2 = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fPostOL2.prototype.parent.constructor.call(this, owner);
		this.className = "app_budget_transaksi_fPostOL2";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Posting Outlook : Input - Load", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		
		
		this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,22,180,20],tag:2,caption:"Tahun Anggaran",tipeText: ttAngka,maxLength:4,change:[this,"doChange"]});								
		this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,78,230,20],caption:"No Bukti", readOnly:true});					
		this.bGen = new portalui_button(this,{bound:[256,78,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   								
		this.bLoad = new portalui_button(this,{bound:[356,78,80,20],caption:"Ambil Data",click:[this,"doLoad"]});		   								
		this.bUpload = new portalui_uploader(this,{bound:[520,78,100,20],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		
		this.p1 = new portalui_panel(this,{bound:[20,189,600,420],caption:"Data Jurnal Selisih Outlook"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,600,370],colCount:6,
				colTitle:["Kode Akun","DC","Nama","Nilai Selisih","Kode CF","Kode Bidang"],
				colFormat:[[3],[cfNilai]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,395,600,25],buttonStyle:4, grid:this.sg1, pager:[this,"selectPage"]});		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
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
window.app_budget_transaksi_fPostOL2.extend(window.portalui_childForm);
window.app_budget_transaksi_fPostOL2.implement({
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
			line.kode_akun, line.dc, line.nama, parseFloat(line.nilai),line.kode_cf,line.kode_bidang]);
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
						this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abaupost_m','no_post',this.app._lokasi+"-OL"+this.eTahun.getText().substr(2,2)+".",'0000'));
						uses("server_util_arrayList");
						var sql = new server_util_arrayList();			
						this.tahun2 = parseFloat(this.eTahun.getText()) - 1;
						var tgl = this.tahun2+'-12-01';	
				
						sql.add("delete from agg_abaupost_m where keterangan = 'OL' and periode = '"+this.tahun2+'12'+"'");
						sql.add("delete from agg_gldt where modul = 'OL' and periode = '"+this.tahun2+'12'+"'");
						
						sql.add("insert into agg_abaupost_m(no_post, kode_lokasi, keterangan, tgl_input, nik_user, periode)"+
								"                values('"+this.ed_nb.getText()+"','"+this.app._lokKonsol+"','OL',now(), '"+this.app._userLog+"','"+this.tahun2+'12'+"')");
						var idx=0;
						for (var i=0;i< this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								idx++;
								if (this.sg1.cells(3,i) != "0") {
									var nilai = parseFloat(this.sg1.cells(3,i));
									sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_cf) values "+
											"('"+this.ed_nb.getText()+"',"+idx+",'"+this.app._lokKonsol+"','OL','-','-','"+tgl+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(1,i)+"',"+nilai+",'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(5,i)+"','"+this.tahun2+'12'+"','-','IDR',1,"+nilai+",now(),'"+this.app._userLog+"','-','-','-','-','-','-','"+this.sg1.cells(4,i)+"')");

								}
							}
						}						
						sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
								"select '"+this.ed_nb.getText()+"',0,'"+this.app._lokKonsol+"','OL','KOMA','-','"+tgl+"','5402000002',case when sum(case dc when 'D' then nilai else -nilai end)<0 then 'D' else 'C' end,abs(sum(case dc when 'D' then nilai else -nilai end)),'-','0','"+this.tahun2+'12'+"','-','IDR',1,abs(sum(case dc when 'D' then nilai else -nilai end)),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+
								"from agg_gldt where periode like '"+this.tahun2+"%'  and modul ='OL'");

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
			this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abaupost_m','no_post',this.app._lokasi+"-OL"+this.eTahun.getText().substr(2,2)+".",'0000'));
		if (sender == this.bRefresh) {			
			this.sg1.clear(1);
		}
	},	
	doLoad: function(sender){
		this.sg1.clear();
		sql="call sp_agg_rkap_total_inv ('FS1','0','2011','00','01','99','1','3','"+this.app._nikUser+"')";
		this.dbLib.execQuerySync(sql);	
		var data = this.dbLib.getDataProvider("select kode_neraca,case when substring(kode_neraca,1,1) = '3' then 'C' else 'D' end as dc,nama,round(n2-n1,0)  as nilai from agg_neraca_tmp where (round(n2-n1,0)>0) and tipe ='posting' and nik_user='"+this.app._nikUser+"' order by rowindex",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];				
				this.sg1.appendData([line.kode_neraca,line.dc.toUpperCase(),line.nama,floatToNilai(line.nilai),'-','0']);
			}
		} 
		sql="call sp_agg_rkap_total_inv ('FS1','0','2011','00','01','99','4','4','"+this.app._nikUser+"')";
		this.dbLib.execQuerySync(sql);	
		var data = this.dbLib.getDataProvider("select kode_neraca,case when substring(kode_neraca,1,1) = '3' then 'C' else 'D' end as dc,nama,round(abs(n2)-abs(n1),0)  as nilai from agg_neraca_tmp where (round(abs(n2)-abs(n1),0)>0) and tipe ='posting' and nik_user='"+this.app._nikUser+"' order by rowindex",true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;
			for (var i in data.rs.rows){
				line = data.rs.rows[i];				
				this.sg1.appendData([line.kode_neraca,line.dc.toUpperCase(),line.nama,floatToNilai(line.nilai),'-','4']);
			}
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
