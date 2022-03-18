window.app_saku3_transaksi_sai_fTiketAju = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sai_fTiketAju.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sai_fTiketAju";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form User Tiket: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,18,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});					this.pc1 = new pageControl(this,{bound:[5,18,1000,450], childPage:["Invoice SAI","Daftar Tiket","Tiket Baru","Histori Tiket","Filter Data"]});				this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:8,tag:9,				colTitle:["Status","Periode","No Invoice","No Faktur","Deskripsi","Nilai","PPN","Tagihan"],				colWidth:[[7,6,5,4,3,2,1,0],[100,80,80,250,120,180,60,80]],				readOnly:true,								colFormat:[[5,6,7],[cfNilai,cfNilai,cfNilai]],																				defaultRow:1,autoAppend:false});		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});				this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:6,tag:9,
		            colTitle:["No Tiket","Status","Tanggal","Judul","User","Umur (hari)"],
					colWidth:[[5,4,3,2,1,0],[80,150,420,80,80,120]],
					colFormat:[[5],[cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
				this.c_status = new saiCB(this.pc1.childPage[2],{bound:[20,13,202,20],caption:"Status",items:["OPEN"], readOnly:true,tag:4,visible :false});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[2],{bound:[20,13,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[2],{bound:[120,13,100,18],selectDate:[this,"doSelectDate"],visible:false});						this.e_nb = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,13,450,20],caption:"No Tiket", readOnly:true,tag:4});				
		this.e_user = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,14,450,20],caption:"User", readOnly:true,tag:4});		this.e_judul = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,450,20],caption:"Judul", maxLength:100,tag:4});						this.pc2 = new pageControl(this.pc1.childPage[2],{bound:[5,18,990,350], childPage:["Deskripsi","Lampiran"]});				this.e_memo = new saiMemo(this.pc2.childPage[0],{bound:[5,5,980,340],labelWidth:0,caption:"",tag:4});						this.sgUpld = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:2,					    colTitle:["Dokumen","Upload"],
					    colWidth:[[1,0],[80,480]], 
						colFormat:[[1],[cfUpload]], 
						readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:9});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height - 25,this.pc2.width-1,25],buttonStyle:1, grid:this.sgUpld});
				this.e_nb2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,11,482,20],caption:"No Tiket", readOnly:true, tag:5});				
		this.e_judul2 = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,12,482,20],caption:"Judul", readOnly:true, tag:5});
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,13,282,20],caption:"Tgl Tiket", readOnly:true, tag:5});
		this.c_status2 = new saiCB(this.pc1.childPage[3],{bound:[320,13,182,20],labelWidth:80, caption:"Status",items:["OPEN","CLOSE"], readOnly:true,tag:5});
				this.pc3 = new pageControl(this.pc1.childPage[3],{bound:[5,18,990,350], childPage:["Historis Tiket","Detail Tiket","Re- Tiket"]});						this.sg2 = new saiGrid(this.pc3.childPage[0],{bound:[1,5,this.pc3.width-5,this.pc3.height-15],colCount:4,tag:5,		            colTitle:["ID","Tanggal","Keterangan","User"],
					colWidth:[[3,2,1,0],[100,600,100,100]],readOnly:true,
					dblClick:[this,"doDoubleClick2"],autoAppend:false,defaultRow:1});						
				this.e_memo2 = new saiMemo(this.pc3.childPage[1],{bound:[5,5,980,210],labelWidth : 0,caption:"",tag:5});		this.sgFile = new saiGrid(this.pc3.childPage[1],{bound:[5,220,this.pc3.width-11,120],colCount:2,tag:5,					click:[this,"doSgBtnClick"],
		            colTitle:["Dokumen","File"],colWidth:[[1,0],[80,350]],readOnly:true,autoAppend:false,defaultRow:1});				
					this.e_memo3 = new saiMemo(this.pc3.childPage[2],{bound:[5,5,980,210],labelWidth : 0,caption:"",tag:5});		this.sgUpld2 = new saiGrid(this.pc3.childPage[2],{bound:[5,220,this.pc3.width-11,100],colCount:2,					    colTitle:["Dokumen","Upload"],					    colWidth:[[1,0],[80,350]], 						colFormat:[[1],[cfUpload]], 						readOnly:true,change:[this,"doGridChange2"],rowCount:1,tag:9});		this.sgUpld2.setUploadParam([1],"uploadTo", "server/media/", "object","server/media");				this.sgnUpld2 = new sgNavigator(this.pc3.childPage[2],{bound:[1,this.pc3.height - 25,this.pc3.width-1,25],buttonStyle:1, grid:this.sgUpld2});						this.e_nobukti = new saiLabelEdit(this.pc1.childPage[4],{bound:[20,11,250,20],caption:"No Tiket",tag:9});
		this.c_status3 = new saiCB(this.pc1.childPage[4],{bound:[20,10,250,20],caption:"Status",items:["OPEN","JAWAB","CLOSE"], readOnly:true,tag:9});
		this.bCari = new button(this.pc1.childPage[4],{bound:[280,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 22);				this.pc1.childPage[2].rearrangeChild(10, 22);			
		this.pc1.childPage[3].rearrangeChild(10, 22);			this.pc1.childPage[4].rearrangeChild(10, 22);							this.i_refresh = new portalui_imageButton(this,{bound:[985,6,25,20],hint:"Refresh",image:"icon/"+system.getThemes()+"/bRefresh.png",click:[this,"doLoad"]});		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
						var strSQL = "select alamat from karyawan where nik ='"+this.app._userLog+"'";						   							var data = this.dbLib.getDataProvider(strSQL,true);			if (typeof data == "object"){				var line = data.rs.rows[0];											if (line != undefined){											this.e_user.setText(this.app._userLog +" - "+ this.app._namaUser+" - "+line.alamat);					this.kodeCust = line.alamat;				}							}						this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";				
						this.c_status.setText("OPEN");
			this.e_memo2.setReadOnly(true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sai_fTiketAju.extend(window.childForm);
window.app_saku3_transaksi_sai_fTiketAju.implement({	
	mainButtonClick: function(sender, desk){
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
					if (this.e_memo3.getText() != "") {
						var data = this.dbLib.getDataProvider("select max(no_urut)+1 as nu from sai_tiket_d where no_tiket='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line = data.rs.rows[0];							
							var nu = parseFloat(line.nu);
						} 						
						sql.add("update sai_tiket_m set progress='"+this.c_status2.getText()+"' where no_tiket='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("insert into sai_tiket_d (no_tiket,kode_lokasi,nik_user,no_urut,keterangan,tanggal,sts_user) values "+
								"('"+this.e_nb2.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',"+nu+",'"+this.e_memo3.getText()+"',getdate(),'USER')");
						var ix=0;
						for (var i=0;i < this.sgUpld2.getRowCount();i++){
							if (this.sgUpld2.rowValid(i)){
								ix++;
								sql.add("insert into sai_tiket_dok(no_tiket,no_gambar,nu,kode_lokasi,no_urut) values('"+this.e_nb2.getText()+"','"+this.sgUpld2.cells(1,i).tmpfile+"','"+ix+"','"+this.app._lokasi+"',"+nu+")");								
							}	
						}
					}
					else {
						sql.add("insert into sai_tiket_m (no_tiket,tanggal,kode_lokasi,nik_user,form,progress,judul,keterangan,no_close,mandays,periode) values "+
								"('"+this.e_nb.getText()+"',getdate(),'"+this.app._lokasi+"','"+this.app._userLog+"','-','"+this.c_status.getText()+"','"+this.e_judul.getText()+"','"+this.e_memo.getText()+"','-',0,'"+this.e_periode.getText()+"')");					
						sql.add("insert into sai_tiket_d (no_tiket,kode_lokasi,nik_user,no_urut,keterangan,tanggal,sts_user) values "+
								"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.app._userLog+"',0,'"+this.e_memo.getText()+"',getdate(),'USER')");					
						var ix=0;
						for (var i=0;i < this.sgUpld.getRowCount();i++){
							if (this.sgUpld.rowValid(i)){
								ix++;
								sql.add("insert into sai_tiket_dok(no_tiket,no_gambar,nu,kode_lokasi,no_urut) values('"+this.e_nb.getText()+"','"+this.sgUpld.cells(1,i).tmpfile+"','"+ix+"','"+this.app._lokasi+"',0)");								
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
					this.sg.clear(1); this.sgUpld.clear(1); 			
					this.doClick();
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbSimpan);
				break;
			case "simpan" :												
				//edit
				if (this.e_memo3.getText() != "") {					
					this.e_nb2.setTag(1);
					this.c_status2.setTag(1);
					this.e_memo3.setTag(1);					
					this.e_judul2.setTag(1);							
					this.e_tgl.setTag(1);							
		
					this.e_nb.setTag(4);
					this.e_judul.setTag(4);					
					this.e_user.setTag(4);
					this.e_memo.setTag(4);										
				}
				//simpan
				else {					
					this.e_nb.setTag(1);
					this.e_judul.setTag(1);
					this.e_user.setTag(1);
					this.e_memo.setTag(1);					

					this.e_nb2.setTag(5);
					this.c_status2.setTag(5);
					this.e_memo3.setTag(5);					
					this.e_judul2.setTag(5);							
					this.e_tgl.setTag(5);							
				}				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
		this.doLoad();
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sai_tiket_m","no_tiket",this.app._lokasi+"-SAI"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.dp_d1.setFocus();
		setTipeButton(tbSimpan);
	},			
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[2]);																		
				this.e_nb2.setText(this.sg.cells(0,row));
				this.e_judul2.setText(this.sg.cells(3,row));
				this.e_tgl.setText(this.sg.cells(2,row));				
				
				var data = this.dbLib.getDataProvider("select no_urut,convert(varchar,tanggal,103) as tanggal,substring(keterangan,1,100) as keterangan,nik_user from sai_tiket_d where no_tiket='"+this.e_nb2.getText()+"' order by no_urut desc",true); //and kode_lokasi='"+this.app._lokasi+"' 
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.no_urut,line.tanggal,line.keterangan,line.nik_user]);
					}
				} else this.sg2.clear(1);						
			
				if (this.sg.cells(1,row) == "CLOSE") setTipeButton(tbAllFalse);
				else setTipeButton(tbSimpan);
				
				this.doDoubleClick2(this.sg2,0,0);
			}
		} catch(e) {alert(e);}
	},
	doDoubleClick2: function(sender, col , row) {
		try{
			if (this.sg2.cells(0,row) != "") {			
				var data = this.dbLib.getDataProvider("select keterangan from sai_tiket_d where no_tiket='"+this.e_nb2.getText()+"' and no_urut="+this.sg2.cells(0,row),true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];							
					//this.e_memo2.setText(line.keterangan);								
					this.e_memo2.setText(line.keterangan.replace(/\<br\>/gi,"\r\n"));								
				}
				//this.e_memo2.setText(this.sg2.cells(2,row));								
				this.sgFile.clear();								
				var data = this.dbLib.getDataProvider("select a.no_gambar from sai_tiket_dok a where a.no_urut="+this.sg2.cells(0,row)+" and a.no_tiket = '"+this.e_nb2.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgFile.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar, "Open"]);
					}
				} else this.sgFile.clear(1);										
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){						
		var filterAwal = " and a.nik_user='"+this.app._userLog+"' ";
		var strSQL = "select a.no_tiket,a.progress,convert(varchar,a.tanggal,103) as tgl,a.tanggal,a.judul,a.nik_user+' - '+b.nama as nama,datediff(day,a.tanggal,getdate())+1 as umur "+
		             "from sai_tiket_m a inner join hakakses b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi "+
					 "where a.progress <> 'CLOSE' and a.kode_lokasi='"+this.app._lokasi+"' "+filterAwal +" order by a.no_tiket desc";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);							var strSQL = "select a.kode_cust,a.no_inv,a.no_fp,a.keterangan,a.periode, "+					 "a.nilai,a.nilai_ppn,a.nilai+a.nilai_ppn as total  "+ 					 "from sai_bill_d a "+					 					 "where a.kode_cust='"+this.kodeCust+"' and a.no_kas='-' and a.kode_lokasi ='"+this.app._lokasi+"' order by a.no_inv";					var data = this.dbLib.getDataProvider(strSQL,true);		if (typeof data == "object" && data.rs.rows[0] != undefined){			var line;			this.sg1.clear();			for (var i in data.rs.rows){				line = data.rs.rows[i];																this.sg1.appendData(["BILL",line.periode,line.no_inv,line.no_fp,line.keterangan,floatToNilai(line.nilai),floatToNilai(line.nilai_ppn),floatToNilai(line.total)]);			}		} else this.sg1.clear(1);		
	},	
	doCari:function(sender){						
		var filterAwal = " and a.nik_user='"+this.app._userLog+"' ";
		var filter = "";
		if (this.e_nobukti.getText()!="") {
			filter = " and a.no_tiket='"+this.e_nobukti.getText()+"' ";			
		}
		else {
			if (this.c_status3.getText()=="OPEN") filter = " and a.progress = 'OPEN' ";
			if (this.c_status3.getText()=="JAWAB") filter = " and a.progress = 'JAWAB' ";
			if (this.c_status3.getText()=="CLOSE") filter = " and a.progress = 'CLOSE' ";
		}
		var strSQL = "select a.no_tiket,a.progress,convert(varchar,a.tanggal,103) as tgl,a.tanggal,a.judul,a.nik_user+' - '+b.nama as nama ,datediff(day,a.tanggal,getdate())+1 as umur  "+
		             "from sai_tiket_m a inner join hakakses b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi "+					 		             
					 "where a.kode_lokasi='"+this.app._lokasi+"' "+filter +" order by a.no_tiket desc";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	},	
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];												
			this.sg.appendData([line.no_tiket,line.progress,line.tgl,line.judul,line.nama,line.umur]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.e_memo3.getText() != "") var nb = this.e_nb2.getText(); else var nb = this.e_nb.getText();
							this.nama_report="server_report_saku2_kopeg_tiket_rptTiketFormMail";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tiket='"+nb+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg2.clear(1); this.sgFile.clear(1); this.sgUpld.clear(1); this.sgUpld2.clear(1); 						
			this.doClick();
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);	
			this.c_status.setText("OPEN");
			this.c_status2.setText("OPEN");
			this.e_memo.setText("");
			this.e_memo2.setText("");
			this.e_memo3.setText("");
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{
        	if (sender == this.sgUpld && col == 1){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + data.tmpfile;
                this.sgUpld.cells(0,row, data.tmpfile);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    },
	doSgBtnClick: function(sender, col, row){
		try{
			window.open("server/media/"+this.sgFile.getCell(0,row));
		}catch(e){
			alert(e);
		}
	},
	doGridChange2: function(sender, col, row,param1,result, data){
	    try{
        	if (sender == this.sgUpld2 && col == 1){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld2.columns.get(1).param2 + data.tmpfile;
                this.sgUpld2.cells(0,row, data.tmpfile);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    }
});