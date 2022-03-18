window.app_saku3_transaksi_haji_fSetor = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_haji_fSetor.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_haji_fSetor";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Setoran Penerimaan: Input/Edit", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["List Setoran","Detail Setoran"]});				
		this.sg3 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:5,tag:9,
		            colTitle:["No KasBank","Tanggal","No Dokumen","Deskripsi","Akun KasBank"],
					colWidth:[[4,3,2,1,0],[300,250,150,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
						
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[1],{bound:[20,16,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[1],{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});								
		this.e_ket = new saiLabelEdit(this.pc2.childPage[1],{bound:[20,17,470,20],caption:"Deskripsi", maxLength:150});										
		this.e_total = new saiLabelEdit(this.pc2.childPage[1],{bound:[790,17,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.bTampil = new portalui_button(this.pc2.childPage[1],{bound:[680,17,80,18],caption:"Tampil Data",click:[this,"doLoadData"]});		
		
		this.pc1 = new pageControl(this.pc2.childPage[1],{bound:[5,12,990,350], childPage:["Rekap Data","Detail Data"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,310],colCount:5,tag:0,
		            colTitle:["Kode Rek","Nama Rekening","Curr","Total","Total IDR"],					
					colWidth:[[4,3,2,1,0],[100,100,60,550,100]],readOnly:true,colFormat:[[3,4],[cfNilai,cfNilai]],
					autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,310],colCount:9,tag:9,
				colTitle:["Kode Rek","No Bukti","Tanggal","Keterangan","Peserta","No Registrasi","Jadwal","Curr","Nilai"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[100,60,150,100,150,210,80,100,80]],readOnly:true,
				colFormat:[[8],[cfNilai]],												
				defaultRow:1,autoAppend:false});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});
				
		this.rearrangeChild(10, 23);
		this.pc2.childPage[1].rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('HAJSETOR') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];					
					if (line.kode_spro == "HAJSETOR") this.akunSetor = line.flag;													
				}
			}
			
			this.jenis = "BK";
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_haji_fSetor.extend(window.childForm);
window.app_saku3_transaksi_haji_fSetor.implement({
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
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from haj_setor where no_setor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update haj_titipbayar_d set no_setor='-' where no_setor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update haj_titipbayar_tambah set no_setor='-' where no_setor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					} 					
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','-','-','"+this.akunSetor+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBSETOR','"+this.jenis+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_total.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");																								
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
							"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',999,'"+this.akunSetor+"','"+this.e_ket.getText()+"','D',"+nilaiToFloat(this.e_total.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBSETOR','KBTEMP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.e_total.getText())+")");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){															
								var kurs = nilaiToFloat(this.sg.cells(4,i))/nilaiToFloat(this.sg.cells(3,i));
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank,nilai_curr) values "+
										"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.sg.cells(4,i))+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBSETOR','KBTERIMA','"+this.e_periode.getText()+"','"+this.sg.cells(2,i)+"',"+kurs+",'"+this.app._userLog+"',getdate(),'-',"+nilaiToFloat(this.sg.cells(3,i))+")");
								sql.add("insert into haj_setor(no_setor,kode_pp,kode_lokasi,kode_akun,kode_curr,nilai_curr,nilai,kurs,no_terima) values "+
									    "('"+this.e_nb.getText()+"','"+this.app._kodePP+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"',"+nilaiToFloat(this.sg.cells(3,i))+","+nilaiToFloat(this.sg.cells(4,i))+","+kurs+",'-')");
							}
						}						
					}
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){															
								sql.add("update haj_titipbayar_d set no_setor='"+this.e_nb.getText()+"' where no_bukti ='"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								sql.add("update haj_titipbayar_tambah set no_setor='"+this.e_nb.getText()+"' where no_bukti ='"+this.sg1.cells(1,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
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
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :														
			case "ubah" :														
				this.preView = "1";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
												
				if (nilaiToFloat(this.e_total.getText()) == 0) {
					system.alert(this,"Transaksi tidak valid.","Toral tidak boleh nol.");
					return false;						
				}
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				} 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;	
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kas_m where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
					sql.add("delete from haj_setor where no_setor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update haj_titipbayar_d set no_setor='-' where no_setor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update haj_titipbayar_tambah set no_setor='-' where no_setor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}			
		this.doLoad3();
	},
	doLoadData:function(sender){		
		if (this.e_periode.getText()!="") {
			var tot = 0;
			var data1 = this.dbLib.getDataProvider("select a.akun_kb,c.nama,a.curr_bayar,sum(a.bayar_orgi)+sum(isnull(d.nilai,0)) as total,sum(b.nilai) as total_idr "+
						"from haj_titipbayar_d a inner join kas_j b on a.akun_kb=b.kode_akun and a.kode_lokasi=b.kode_lokasi and a.no_bukti=b.no_kas     "+
						"                        inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi "+
						"                        left join (select no_bukti,kode_lokasi,akun_kb,kode_pp,sum(nilai) as nilai "+
						"                                   from haj_titipbayar_tambah where no_setor='-' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						"                                   group by no_bukti,kode_lokasi,akun_kb,kode_pp) d on a.no_bukti=d.no_bukti and a.kode_lokasi=d.kode_lokasi and a.akun_kb=d.akun_kb and a.kode_pp=d.kode_pp "+
						"where a.kode_pp='"+this.app._kodePP+"' and a.no_setor ='-' and b.periode<='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
						"group by a.akun_kb,a.curr_bayar,c.nama",true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];
					tot += parseFloat(line1.total_idr);
					this.sg.appendData([line1.akun_kb,line1.nama,line1.curr_bayar,floatToNilai(line1.total),floatToNilai(line1.total_idr)]);
				}
			} else this.sg.clear(1);				
			this.e_total.setText(floatToNilai(tot));
			
			var strSQL = "select a.akun_kb,a.no_bukti,convert(varchar,b.tanggal,103) as tgl,b.keterangan,c.no_peserta +' - '+c.nama as peserta,a.no_reg,e.no_jadwal+' - '+e.nama as jadwal,a.curr_bayar,a.bayar_orgi+isnull(f.nilai,0) as bayar "+
						 "from haj_titipbayar_d a "+
						 "inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
						 "inner join haj_peserta c on a.no_peserta=c.no_peserta and a.kode_lokasi=c.kode_lokasi "+
						 "inner join haj_reg d on a.no_reg=d.no_reg and a.kode_lokasi=d.kode_lokasi "+
						 "inner join haj_jadwal e on d.no_jadwal=d.no_jadwal and d.kode_lokasi=e.kode_lokasi "+
			             "left join (select no_bukti,kode_lokasi,akun_kb,kode_pp,sum(nilai) as nilai "+
			             "           from haj_titipbayar_tambah where no_setor='-' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						 "           group by no_bukti,kode_lokasi,akun_kb,kode_pp) f on a.no_bukti=f.no_bukti and a.kode_lokasi=f.kode_lokasi and a.akun_kb=f.akun_kb and a.kode_pp=f.kode_pp "+
						 " where a.no_setor ='-' and a.kode_lokasi='"+this.app._lokasi+"' and b.periode<='"+this.e_periode.getText()+"' and a.kode_pp='"+this.app._kodePP+"' order by a.curr_bayar,a.akun_kb,b.tanggal";						
			var data1 = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
				var line1;
				this.sg1.clear();
				for (var i in data1.rs.rows){
					line1 = data1.rs.rows[i];																													
					this.sg1.appendData([line1.akun_kb,line1.no_bukti,line1.tgl,line1.keterangan,line1.peserta,line1.no_reg,line1.jadwal,line1.curr_bayar,floatToNilai(line1.bayar)]);
				}
			} else this.sg1.clear(1);
			
		}
	},	
	doClick:function(sender){		
		if (this.e_periode.getText()!= "" && this.jenis != "" && this.jenis != undefined) {
			if (this.stsSimpan == 0) {				
				this.standarLib.clearByTag(this, new Array("3"),this.e_nb);
				this.sg.clear(1); this.sg1.clear(1);				
				this.e_total.setText("0");
				this.bTampil.setVisible(true);
			}			
			this.stsSimpan = 1;					
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.jenis+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}			
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_kopeg_sju_rptKbJurnalBukti";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
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
								this.pc2.hide();   
							} 
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}else system.info(this,result,"");
	    			break;										
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
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
				this.pc2.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1","3"),this.e_nb);
			this.sg1.clear(1); this.sg.clear(1); 
			setTipeButton(tbAllFalse);		
			this.doLoad3();
			this.pc2.setActivePage(this.pc2.childPage[0]);			
		} catch(e) {
			alert(e);
		}
	},					
	doLoad3:function(sender){																							
		var strSQL = "select distinct a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.no_dokumen,a.keterangan,a.akun_kb+' - '+c.nama as akun,a.tanggal "+
		             "from kas_m a "+					 
					 "inner join masakun c on a.akun_kb=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+					 					 
					 "left join haj_setor b on a.no_kas=b.no_setor and a.kode_lokasi=b.kode_lokasi and b.no_terima<>'-' "+
					 "where b.no_setor is null and a.kode_pp='"+this.app._kodePP+"' and a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'KBSETOR' and a.posted ='F' "+
					 "order by a.tanggal";
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
			this.sg3.appendData([line.no_kas,line.tgl,line.no_dokumen,line.keterangan,line.akun]); 
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
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.bTampil.setVisible(false);
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select keterangan,jenis "+
							 "from kas_m "+
							 "where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.jenis = line.jenis;											
						this.e_ket.setText(line.keterangan);															
					}
				}
				
				var tot = 0;
				var data1 = this.dbLib.getDataProvider("select a.akun_kb,c.nama,a.curr_bayar,sum(a.bayar_orgi)+sum(isnull(d.nilai,0)) as total,sum(b.nilai) as total_idr "+
							"from haj_titipbayar_d a inner join kas_j b on a.akun_kb=b.kode_akun and a.kode_lokasi=b.kode_lokasi and a.no_bukti=b.no_kas     "+
							"                        inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi "+
							"                        left join (select no_bukti,kode_lokasi,akun_kb,kode_pp,sum(nilai) as nilai "+
						    "                                   from haj_titipbayar_tambah where no_setor='"+this.e_nb.getText()+"' and periode<='"+this.e_periode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
						    "                                   group by no_bukti,kode_lokasi,akun_kb,kode_pp) d on a.no_bukti=d.no_bukti and a.kode_lokasi=d.kode_lokasi and a.akun_kb=d.akun_kb and a.kode_pp=d.kode_pp "+
							"where a.no_setor ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' "+
							"group by a.akun_kb,a.curr_bayar,c.nama",true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];
						tot += parseFloat(line1.total_idr);
						this.sg.appendData([line1.akun_kb,line1.nama,line1.curr_bayar,floatToNilai(line1.total),floatToNilai(line1.total_idr)]);
					}
				} else this.sg.clear(1);				
				this.e_total.setText(floatToNilai(tot));
				
				var strSQL = "select a.akun_kb,a.no_bukti,convert(varchar,b.tanggal,103) as tgl,b.keterangan,c.no_peserta +' - '+c.nama as peserta,a.no_reg,e.no_jadwal+' - '+e.nama as jadwal,a.curr_bayar,a.bayar_orgi+isnull(f.nilai,0) as bayar "+
							 "from haj_titipbayar_d a "+
							 "inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
							 "inner join haj_peserta c on a.no_peserta=c.no_peserta and a.kode_lokasi=c.kode_lokasi "+
							 "inner join haj_reg d on a.no_reg=d.no_reg and a.kode_lokasi=d.kode_lokasi "+
							 "inner join haj_jadwal e on d.no_jadwal=d.no_jadwal and d.kode_lokasi=e.kode_lokasi "+
							 "left join (select no_bukti,kode_lokasi,akun_kb,kode_pp,sum(nilai) as nilai "+
							 "         from haj_titipbayar_tambah where no_setor='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
							 "         group by no_bukti,kode_lokasi,akun_kb,kode_pp) f on a.no_bukti=f.no_bukti and a.kode_lokasi=f.kode_lokasi and a.akun_kb=f.akun_kb and a.kode_pp=f.kode_pp "+
							 "where a.no_setor ='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.curr_bayar,a.akun_kb,b.tanggal";							
				var data1 = this.dbLib.getDataProvider(strSQL,true);	
				if (typeof data1 == "object" && data1.rs.rows[0] != undefined){
					var line1;
					this.sg1.clear();
					for (var i in data1.rs.rows){
						line1 = data1.rs.rows[i];																													
						this.sg1.appendData([line1.akun_kb,line1.no_bukti,line1.tgl,line1.keterangan,line1.peserta,line1.no_reg,line1.jadwal,line1.curr_bayar,floatToNilai(line1.bayar)]);
					}
				} else this.sg1.clear(1);				
			}						
		} catch(e) {alert(e);}		
	}
});