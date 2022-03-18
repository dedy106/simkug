window.app_saku3_transaksi_uin_fEvalAkunPP = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_uin_fEvalAkunPP.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_uin_fEvalAkunPP";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Evaluasi Proporsional", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.c_tahun = new portalui_saiLabelEdit(this,{bound:[20,22,200,20],caption:"Tahun Budget",readOnly:true,tag:2, change:[this,"doChange"]});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_app = new saiCBBL(this,{bound:[20,19,220,20],caption:"NIK Evaluasi", multiSelection:false, maxLength:10, tag:2});
				
		this.pc1 = new pageControl(this,{bound:[20,10,500,350], childPage:["Evalusi (C/P)","Pesan Error"]}); //C/P=copypaste
		this.sg = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:0,
		            colTitle:["Kode Akun","Kode PP","Deviasi(+/-) %"],
					colWidth:[[2,1,0],[150,150,150]],					
					columnReadOnly:[true,[0,1,2],[]],
					colFormat:[[2],[cfNilai]],					
					pasteEnable:true,autoPaging:true,rowPerPage:50,afterPaste:[this,"doAfterPaste"],
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});				
		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[5,5,490,340],labelWidth:0,tag:9});
		this.e_memo.setReadOnly(true);
		
		this.rearrangeChild(10, 23);
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
				
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			
			var data = this.dbLib.getDataProvider("select tahun from uin_tahun where flag_aktif='1' order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.c_tahun.setText(line.tahun);				
			}
			
			var sql = new server_util_arrayList();			
			sql.add("select kode_akun,nama from masakun where block = '0' and kode_lokasi = '"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);

			var data = this.dbLib.getDataProvider("select a.tahun,isnull(b.no_close,'-') as no_close from uin_tahun a left join uin_close_m b on a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi where a.flag_aktif='1' order by a.tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.c_tahun.setText(line.tahun);	

				if (line.no_close == "-") setTipeButton(tbSimpan);
				else {
					this.c_tahun.setText("");
					system.alert(this,"Closing Budget sudah dilakukan.","Evaluasi tidak dapat dilakukan.");
					setTipeButton(tbAllFalse);
				}
			}

			this.doClick();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_uin_fEvalAkunPP.extend(window.childForm);
window.app_saku3_transaksi_uin_fEvalAkunPP.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();			
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into uin_usul_m(no_usul,kode_lokasi,tahun,tanggal,keterangan,kode_pp,nik_app,no_close,tgl_input,nik_user,total,form,status,kode_pp2) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"',getdate(),'"+this.e_ket.getText()+"','-','-','-',getdate(),'"+this.app._userLog+"',0,'EVAL','EVAL','-')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into uin_eval_d(no_eval,kode_lokasi,kode_akun,kode_pp,persen,bulan) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+",'-')");

								if (nilaiToFloat(this.sg.cells(2,i)) > 0) var dc = "D"; 																	
								else var dc = "C"; 
								
								sql.add("insert into uin_usul_d(no_usul,kode_lokasi,nu,kode_norma,keterangan,satuan,tarif,vol,total,tahun,dc, kdsatker,kdprogram,kdgiat,kddept,kdunit, kdoutput,kdsoutput,kdkmpnen,kdskmpnen,kode_akun,kode_pp,idbukti,no_park)  "+
										"select '"+this.e_nb.getText()+"',a.kode_lokasi,a.nu,a.kode_norma,a.keterangan,a.satuan,a.tarif,abs((sum(a.vol)* "+nilaiToFloat(this.sg.cells(2,i))+")/100),abs(round((sum(a.total)*"+nilaiToFloat(this.sg.cells(2,i))+")/100,0)),a.tahun,'"+dc+"', a.kdsatker,a.kdprogram,a.kdgiat,a.kddept,kdunit,a.kdoutput,a.kdsoutput,a.kdkmpnen,a.kdskmpnen,a.kode_akun,a.kode_pp,a.idbukti,'-' "+
										"from uin_usul_d a inner join uin_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi "+
										"where a.kode_pp='"+this.sg.cells(1,i)+"' and a.kode_akun='"+this.sg.cells(0,i)+"' and a.tahun='"+this.c_tahun.getText()+"' and b.no_close='-' "+
										"group by a.kode_lokasi,a.nu,a.kode_norma,a.keterangan,a.satuan,a.tarif,a.tahun,a.kdsatker,a.kdprogram,a.kdgiat,a.kddept,a.kdunit,a.kdoutput,a.kdsoutput,a.kdkmpnen,a.kdskmpnen,a.kode_akun,a.kode_pp,a.idbukti");		

							}
						}
					}
					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :					
				var temu = false;
				var msg  = ""; this.e_memo.setText("");
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							var strSQL = "select kdakun from uin_akun where kdakun = '"+this.sg.cells(0,i)+"'";						
							var data = this.dbLib.getDataProvider(strSQL,true);
							if (typeof data == "object"){
								var line = data.rs.rows[0];							
								if (line == undefined){	
									temu = true;									
									msg+= "Kode Akun : "+this.sg.cells(0,i)+"\n";				
								}
							}
							var strSQL = "select kode_pp from pp where kode_pp = '"+this.sg.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'";						
							var data = this.dbLib.getDataProvider(strSQL,true);
							if (typeof data == "object"){
								var line = data.rs.rows[0];							
								if (line == undefined){	
									temu = true;									
									msg+= "Kode PP : "+this.sg.cells(1,i)+"\n";				
								}
							}
						}
					}
				}						
				if (temu) {
					setTipeButton(tbAllFalse);
					this.e_memo.setText(msg);			
					system.alert(this,"Data tidak valid.","Lihat Pesan ERROR.");
					this.pc1.setActivePage(this.pc1.childPage[1]);
					return false;
				}
				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doClick:function(sender){		
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"uin_usul_m","no_usul",this.app._lokasi+"-EVL"+this.c_tahun.getText().substr(2,2)+".","00000"));
		this.e_ket.setFocus();
		setTipeButton(tbSimpan);						
	},					
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (No : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      							
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}	
});