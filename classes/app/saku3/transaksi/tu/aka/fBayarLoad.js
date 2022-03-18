window.app_saku3_transaksi_tu_aka_fBayarLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_aka_fBayarLoad.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku3_transaksi_tu_aka_fBayarLoad";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Upload Data Pembayaran ", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("util_dbLib",true);		
				
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Load", readOnly:true});					
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,15,450,20],caption:"Deskripsi", maxLength:150});					
		this.e_total = new saiLabelEdit(this,{bound:[820,15,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bValid = new button(this,{bound:[720,15,80,18],caption:"Validasi",click:[this,"doValid"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,20,1000,400], childPage:["Pembayaran Mhs","List Error"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9,
				colTitle:["NIM / ID REG","Nilai","Bank","Tanggal","Jenis"],
				colWidth:[[4,3,2,1,0],[100,100,150,100,150]],	
				colFormat:[[1],[cfNilai]],
				pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPage"]});		
		
		this.sg2 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
				colTitle:["ID Error","Kolom","Deskripsi"],
				colWidth:[[2,1,0],[500,150,150]],				
				readOnly:true, 
				autoAppend:false,defaultRow:1
		});		
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg2});		
		
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);		
		setTipeButton(tbAllFalse);				
		
		this.status = "";
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
				
	}
};
window.app_saku3_transaksi_tu_aka_fBayarLoad.extend(window.portalui_childForm);
window.app_saku3_transaksi_tu_aka_fBayarLoad.implement({	
	doAfterPaste: function(sender,totalRow){
		try {
			this.sgn.setTotalPage(sender.getTotalPage());
			this.sgn.rearrange();	

			var tagih = tot = 0;
			for (var i=0;i < this.sg1.getRowCount();i++){
				tagih = nilaiToFloat(this.sg1.cells(1,i));						
				tot += tagih;
			}
			this.e_total.setText(floatToNilai(tot));
			
			this.status = "LOAD";
			this.nbTmp = this.app._userLog;
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();												
			sql.add("delete from aka_bayar_tmp where no_bayar='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");		
			this.dbLib.execQuerySync(sql);	
			
			this.status = "LOAD";
			for (var i=0;i < this.sg1.getRowCount();i++){				
				sql.add("insert into aka_bayar_tmp (no_bayar,kode_lokasi,nim,nilai,bank,tanggal,jenis) values "+
						"('"+this.nbTmp+"','"+this.app._lokasi+"','"+this.sg1.cells(0,i)+"',"+nilaiToFloat(this.sg1.cells(1,i))+",'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(4,i)+"')");																		
			}
			this.dbLib.execArraySQL(sql);								
						
		} catch(e) {alert(e);}
	},
	doPage: function(sender,page){
		this.sg.doSelectPage(page);
	},
	doValid: function(sender){
		var temu = false;
		this.sg2.clear();
		
		//cek nim terdaftar
		var strSQL = "select distinct a.nim as nim from aka_bayar_tmp a "+
					 "left join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+
					 "left join aka_camaba c on a.nim=c.no_reg and a.kode_lokasi=c.kode_lokasi "+
					 "where a.no_bayar='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"' and (b.nim is null or c.no_reg is null)";		

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			var line;			
			for (var i in data.rs.rows){
				temu = true; 
				line = data.rs.rows[i];							
				this.sg2.appendData([line.nim,"NIM/IDREG","NIM/IDREG tidak terdaftar"]);
			}
		}

		if (temu) {
			this.pc1.setActivePage(this.pc1.childPage[1]);
			setTipeButton(tbAllFalse);
			system.alert(this,"Data tidak valid.","Lihat List Error !");			
		}
		else setTipeButton(tbSimpan);					
		
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_load_m','no_load',this.app._lokasi+"-LD"+this.e_periode.getText().substr(2,4)+".",'0000'));					
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					
					// sql.add("insert into aka_load_m(no_load,kode_lokasi,periode,tanggal,keterangan,nik_user,tgl_input) values "+ 
					// 		"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._userLog+"',getdate())");
										
					// sql.add("insert into aka_load_d (no_load,kode_lokasi,no_inv,nim,periode,kode_produk,akun_piutang,akun_pdpt,akun_pdd,nilai,periode_susut,periode_sisih,kode_pp,dc,kode_akt,tahunaka,modul,kode_drk,flag_status,no_bill) "+
					// 		"select '"+this.e_nb.getText()+"',a.kode_lokasi,'"+this.e_nb.getText()+"'+'|'+a.nim,a.nim,a.periode,a.kode_produk,a.akun_piutang,a.akun_pdpt,a.akun_pdd,a.nilai,'-',a.periode_sisih,a.kode_pp,a.dc,a.kode_akt,a.tahunaka,'BILLOAD','-','-','-' "+
					// 	    "from aka_bill_tmp a inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+
					// 		"where a.no_bill='"+this.nbTmp+"' and a.kode_lokasi ='"+this.app._lokasi+"'");
										
					// //update kelengkapan data billing 		
					// sql.add("update a set a.kode_akt=b.kode_akt,a.kode_pp=b.kode_jur,a.kode_jalur=b.kode_jalur "+
					// 		"from aka_load_d a inner join aka_mahasiswa b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+
					// 		"where a.no_load='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					// 		"and a.kode_produk in ('BPPP','BPPNP','UP3','SDP2','SKS','DENDA','USTATUS','PERPUS','ASUR','ASRAMA') ");
		
					// //---------------------------------------------------------------------------------------------------------------------------------------		
					// /*  jurnal (akun,drk)
					// 	BPP   --> drk utk maba lihat angkatan maba+jalur/kelas
					// 	BPP   --> drk utk mala hanya lihat jalur/kelas (angkatan diabaikan)
					// 	BPPNP --> drk utk mala hanya lihat jalur/kelas (angkatan diabaikan)

					// 	selain BPP dan BPPNP akun,drk disamakan (abaikan)
					// */

					// sql.add("update a set a.akun_piutang=b.akun_piutang, a.akun_pdpt=b.akun_pdpt, a.akun_pdd=b.akun_pdd, a.kode_drk=b.kode_drk "+
					// 		"from aka_load_d a inner join aka_produk b on a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi and a.kode_akt='"+this.AktMABA+"' and a.kode_jalur=b.kode_jalur and b.kode_akt='MABA' "+
					// 		"where a.no_load='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					// 		"and b.kode_produk in ('BPPP') ");

					// sql.add("update a set a.akun_piutang=b.akun_piutang, a.akun_pdpt=b.akun_pdpt, a.akun_pdd=b.akun_pdd, a.kode_drk=b.kode_drk "+
					// 		"from aka_load_d a inner join aka_produk b on a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi and a.kode_akt<>'"+this.AktMABA+"' and a.kode_jalur=b.kode_jalur and b.kode_akt='MALA' "+
					// 		"where a.no_load='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					// 		"and b.kode_produk in ('BPPP','BPPNP') ");

					// sql.add("update a set a.akun_piutang=b.akun_piutang, a.akun_pdpt=b.akun_pdpt, a.akun_pdd=b.akun_pdd, a.kode_drk=b.kode_drk "+
					// 		"from aka_load_d a inner join aka_produk b on a.kode_produk=b.kode_produk and a.kode_lokasi=b.kode_lokasi "+
					// 		"where a.no_load='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
					// 		"and b.kode_produk in ('UP3','SDP2','SKS','ASUR','PERPUS','DENDA','USTATUS','ASRAMA') ");
					
					// //setting periode awal amortisasi sesuai tahun akademik				
					// sql.add("update a set a.periode_susut=b.periode "+
					// 		"from aka_load_d a inner join ( "+
					// 		"	select kode_lokasi,tahunaka,min(periode) as periode "+
					// 		"   from aka_tahunaka "+
					// 		"   where kode_lokasi='"+this.app._lokasi+"' "+
					// 		"   group by kode_lokasi,tahunaka "+
					// 		"   ) b on a.tahunaka=b.tahunaka and a.kode_lokasi=b.kode_lokasi "+
					// 		"where a.kode_produk in ('BPPP','BPPNP') and a.no_load='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'");

										
					// sql.add("delete from aka_bill_tmp where no_bill='"+this.nbTmp+"' and kode_lokasi ='"+this.app._lokasi+"'");

					setTipeButton(tbAllFalse);					
					this.status = "SIMPAN";
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
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbAllFalse);
					this.pc1.setActivePage(this.pc1.childPage[0]);
				}
				break;
			case "simpan" :	
				this.stsSimpan = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);										
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
					return false;						
				}				
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},		
	doClick: function(sender){
		if (sender == this.i_gen) {
			//this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'aka_loadbyr','no_load',this.app._lokasi+"-LD"+this.e_periode.getText().substr(2,4)+".",'0000'));
			this.e_ket.setFocus();
		}		
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":
					if (result.toLowerCase().search("error") == -1){						
						if (this.status == "SIMPAN") {
							if (this.stsSimpan=="1") {							
								// this.nama_report="server_report_saku2_kopeg_aka_rptAkBillJurnal";
								// this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_bill='"+this.e_nb.getText()+"' ";
								this.filter = this.filter2;
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;
								this.pc1.hide();							
							}
						}
					}else
						system.info(this, result,"");											
				break;
			}
		}		
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();			
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, [0,1],undefined);				
			this.sg1.clear(1); 
			setTipeButton(tbAllFalse);
			this.pc1.setActivePage(this.pc1.childPage[0]);
			this.status = "";
		} catch(e) {
			alert(e);
		}
	}
});
