window.app_saku3_transaksi_bpr_fProyekView = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_bpr_fProyekView.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_bpr_fProyekView";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Approve Data Proyek", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.l_tgl1 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,12,100,18],selectDate:[this,"doSelectDate"]});
		
		this.cb_cust = new portalui_saiCBBL(this,{bound:[20,14,220,20],caption:"Customer",tag:2,multiSelection:false,change:[this,"doChange"]});
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Project","Data Project","Filter Cari"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:5,tag:9,
		            colTitle:["ID Project","Customer","No Dokumen","Deskripsi","Nilai"],
					colWidth:[[4,3,2,1,0],[100,300,200,200,100]],
					colFormat:[[4],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});				
		
		this.c_status = new saiCB(this.pc2.childPage[1],{bound:[20,11,202,20],caption:"Status",items:["APPROVE","REVISI"], readOnly:true,tag:2});
		this.e_nb = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,12,200,20],caption:"No Approve", readOnly:true});						
		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[1],{bound:[20,13,220,20],caption:"Bagian / Unit",tag:2,readOnly:true}); 					
		this.cb_kode = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,10,200,20],caption:"ID Proyek", readOnly:true, change:[this,"doChange"]});	
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[1,20,996,305], childPage:["Data Proyek","Rincian RAB","File Dokumen"]});
		this.e_dok = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,350,20],caption:"No Kontrak", maxLength:50, tag:1,readOnly:true});	
		this.e_nama = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,11,600,20],caption:"Deskripsi", maxLength:200, tag:1,readOnly:true});			
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,13,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,13,98,18],readOnly:true}); 		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,14,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,14,98,18],readOnly:true}); 
		this.cb_jenis = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,17,220,20],caption:"Jenis",tag:1,readOnly:true}); 						
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Nilai Proyek", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true});
		this.e_nilaippn = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Nilai PPN", tag:1, tipeText:ttNilai, text:"0",readOnly:true});						
		this.e_persenor = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"Persen OR", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"],readOnly:true});								
		this.e_nilaior = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Nilai OR", tag:1, tipeText:ttNilai, text:"0", readOnly:true,readOnly:true});								
		this.e_jumlah = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"Jml Jadwal", tag:1, tipeText:ttNilai, text:"0",readOnly:true});			
		
		this.sgr = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,337],colCount:4,tag:1,
		            colTitle:["Kegiatan","Quantity","Harga Satuan","SubTotal"],
					colWidth:[[3,2,1,0],[100,100,100,500]],
					columnReadOnly:[true,[3],[]],					
					colFormat:[[1,2,3],[cfNilai,cfNilai,cfNilai]],	
					pasteEnable:true,afterPaste:[this,"doAfterPaste2"], 
					nilaiChange:[this,"doNilaiChange2"],change:[this,"doChangeCells2"],autoAppend:true,defaultRow:1});
		this.sgnr = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sgr});		
				
		this.sg1mp2 = new saiGrid(this.pc1.childPage[2],{bound:[1,5,this.pc1.width-4,this.pc1.height-35],colCount:4,readOnly:true,tag:9,
					colTitle:["Kd Jenis","Jenis Dokumen","Path File","DownLoad"],
					colWidth:[[3,2,1,0],[80,480,200,80]],
					rowCount:1,colFormat:[[3],[cfButton]],click:[this,"doSgBtnClick"], colAlign:[[3],[alCenter]]});
		this.sgn2 = new sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height - 25,this.pc1.width - 1,25],buttonStyle:3, 
					pager:[this,"doPager2"],beforePrint:[this,"doBeforePrintSg2"], grid:this.sg1mp2});            

		this.c_status2 = new saiCB(this.pc2.childPage[2],{bound:[20,10,200,20],caption:"Status",items:["APPROVE","REVISI"], readOnly:true,tag:2});
		this.cb_cust2 = new portalui_saiCBBL(this.pc2.childPage[2],{bound:[20,12,220,20],caption:"Customer",tag:9,multiSelection:false}); 				
		this.bCari = new button(this.pc2.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc2.childPage[2].rearrangeChild(10, 23);	
		
		this.e_memo = new saiMemo(this.pc2.childPage[1],{bound:[520,10,450,80],caption:"Catatan Approve",tag:9,readOnly:true});		

		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";
			
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_pp.setSQL("select kode_pp,nama from pp where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);//kode_pp='"+this.app._kodePP+"' and 
			this.cb_cust.setSQL("select kode_cust,nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			this.cb_cust2.setSQL("select kode_cust,nama from cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Customer",true);
			this.cb_jenis.setSQL("select kode_jenis,nama from pr_jenis where kode_lokasi='"+this.app._lokasi+"'",["kode_jenis","nama"],false,["Kode","Nama"],"and","Data Jenis",true);
			
			this.dataPP = this.app._pp;	
			this.cb_pp.setText(this.app._kodePP);		
				
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_bpr_fProyekView.extend(window.childForm);
window.app_saku3_transaksi_bpr_fProyekView.implement({	
	doSgBtnClick: function(sender, col, row){
		try{
			if (col === 3)
				window.open("server/media/"+this.sg1mp2.getCell(2,row));
		}catch(e){
			alert(e);
		}
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
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					if (this.c_status.getText()=="APPROVE")  var prog = "1";
					if (this.c_status.getText()=="REVISI")  var prog = "R";												
					
					sql.add("update pr_proyek set progress='"+prog+"',no_app='"+this.e_nb.getText()+"' where kode_proyek ='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("update pr_proyek_app set no_appseb = '"+this.e_nb.getText()+"' where no_appseb ='-' and no_bukti='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and modul='APP_PR'");

					sql.add("insert into pr_proyek_app (no_app,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,no_bukti,modul,no_appseb,catatan) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'"+this.c_status.getText()+"','"+this.cb_kode.getText()+"','APP_PR','-','"+this.e_memo.getText()+"')");
					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbSimpan);
					this.stsSimpan = 1;				
					this.sgr.clear(1);
					this.sg3.clear(1);
					this.sg1mp2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);	
					this.doClick();				
					this.cb_cust.setText("");
				break;
			case "simpan" :	
			case "ubah" :		
				this.simpan();					
				break;				
			case "simpancek" : this.simpan();			
				break;							
			case "hapus" :	
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();				
				sql.add("delete from pr_proyek_app where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("update pr_proyek set progress='0',no_app='-' where no_app='"+this.noAppLama+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		
		this.doClick();		
	},			
	doClick:function(sender){
		if (this.stsSimpan == 0) {					
			this.sg1.clear(1); 
			this.sg3.clear(1); 	
			this.sg1mp2.clear(1);		
		}
		this.noAppLama = "-";
		this.stsSimpan = 1;
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"pr_proyek_app","no_app",this.app._lokasi+"-APP"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.c_status.setFocus();
		setTipeButton(tbSimpan);			
	},	
	doChange: function(sender){
		try{
			if (sender == this.cb_cust && this.cb_cust.getText() != "" && this.stsSimpan==1) this.doLoad3();
			
			if (sender == this.cb_kode && this.cb_kode.getText() != ""){
				var strSQL = "select a.*,isnull(b.catatan,'-') as catatan from pr_proyek a left join pr_proyek_app b on a.kode_proyek=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.no_appseb='-' "+
							"where a.kode_proyek ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){			
						this.noAppLama = line.no_app;	
						this.e_memo.setText(line.catatan);		
						this.e_nama.setText(line.nama);
						this.e_dok.setText(line.no_pks);						
						this.cb_pp.setText(line.kode_pp);						
						this.dp_d1.setText(line.tgl_mulai);
						this.dp_d2.setText(line.tgl_selesai);
						
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_nilaippn.setText(floatToNilai(line.nilai_ppn));
						this.e_persenor.setText(floatToNilai(line.p_or));
						this.e_nilaior.setText(floatToNilai(line.nilai_or));
						this.cb_jenis.setText(line.kode_jenis);
						this.e_jumlah.setText(floatToNilai(line.jumlah));
						
						var data = this.dbLib.getDataProvider("select * from pr_rab_d where no_rab = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sgr.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];												
								this.sgr.appendData([line.keterangan,floatToNilai(line.jumlah),floatToNilai(line.harga),floatToNilai(line.total)]);
							}
						} 
						
						this.sg1mp2.clear();
						var data = this.dbLib.getDataProvider("select b.kode_jenis,b.nama,a.no_gambar from pr_proyek_dok a inner join dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi "+
								"where a.kode_proyek = '"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg1mp2.clear();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];													 
								this.sg1mp2.appendData([line.kode_jenis, line.nama, line.no_gambar, "DownLoad"]);
							}
						} else this.sg1mp2.clear(1);	


					}					
				}
			}
			
			if (sender == this.e_persenor && this.e_persenor.getText() != "") {				
				var nilaiOR = Math.round(nilaiToFloat(this.e_nilai.getText()) * nilaiToFloat(this.e_persenor.getText())/100);
				this.e_nilaior.setText(floatToNilai(nilaiOR));
			}
				
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	doLoad3:function(sender){		
		this.pc2.setActivePage(this.pc2.childPage[0]);																			
		var strSQL = "select a.kode_proyek,b.nama,a.no_pks,a.nama as keterangan,a.nilai "+
		             "from pr_proyek a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.kode_cust='"+this.cb_cust.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.progress='0' order by a.kode_proyek desc";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);					
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.kode_proyek,line.nama,line.no_pks,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[1]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																						
				this.cb_kode.setText(this.sg3.cells(0,row));												
			}									
		} catch(e) {alert(e);}
	},
	doCari:function(sender){	
		this.cb_cust.setText(this.cb_cust2.getText());	
		this.stsSimpan=0;		
		setTipeButton(tbUbahHapus);			
		var filter = "";
		if (this.c_status2.getText() == "APPROVE") filter = " and a.progress = '1' ";
		if (this.c_status2.getText() == "REVISI") filter = " and a.progress = 'R' "; 
		
		var strSQL = "select a.kode_proyek,b.nama,a.no_pks,a.nama as keterangan,a.nilai "+
		             "from pr_proyek a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi "+					 					 
					 "where a.kode_lokasi='"+this.app._lokasi+"' "+filter+" and a.kode_cust='"+this.cb_cust2.getText()+"' order by a.kode_proyek desc";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);	
		this.pc2.setActivePage(this.pc2.childPage[0]);	
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	}
});