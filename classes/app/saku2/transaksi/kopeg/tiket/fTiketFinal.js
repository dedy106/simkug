window.app_saku2_transaksi_kopeg_tiket_fTiketFinal = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_tiket_fTiketFinal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_tiket_fTiketFinal";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form User Tiket: Input", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,500], childPage:["Daftar Tiket","Histori Tiket","Filter Data"]});
		this.i_refresh = new portalui_imageButton(this,{bound:[980,18,20,20],hint:"Refresh",image:"icon/"+system.getThemes()+"/bRefresh.png",click:[this,"doLoad"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:8,tag:9,
		            colTitle:["Status","Man/Days","No Tiket","Status","Tanggal","Judul","User","Umur (hari)"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,150,310,80,80,100,70,70]],
					columnReadOnly:[true,[0,2,3,4,5,6,7],[1]],
					buttonStyle:[[0],[bsAuto]], 
					picklist:[[0],[new portalui_arrayMap({items:["REMARK","INPROG"]})]],
					colFormat:[[1,7],[cfNilai,cfNilai]], 
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,100,18],selectDate:[this,"doSelectDate"],visible:false});
		this.e_nb = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"No Close", readOnly:true,tag:1,visible:false});				
		
		this.e_nb2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,482,20],caption:"No Tiket", readOnly:true, tag:5});				
		this.e_judul2 = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,482,20],caption:"Judul", readOnly:true, tag:5});
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,282,20],caption:"Tgl Tiket", readOnly:true, tag:5});
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,500,330],colCount:4,tag:5,
		            colTitle:["ID","Tanggal","Keterangan","User"],
					colWidth:[[3,2,1,0],[60,250,80,50]],readOnly:true,
					dblClick:[this,"doDoubleClick2"],autoAppend:false,defaultRow:1});				
				
		this.e_nobukti = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,250,20],caption:"No Tiket",tag:9});
		this.c_status3 = new saiCB(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"Status",items:["CLOSE"], readOnly:true,tag:9});
		this.bCari = new button(this.pc1.childPage[2],{bound:[230,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
			
		this.rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);	
		this.pc1.childPage[2].rearrangeChild(10, 22);	
		this.i_refresh.setTop(this.pc1.top);
		
		this.e_memo2 = new saiMemo(this.pc1.childPage[1],{bound:[515,73,471,170],labelWidth : 0,caption:"",tag:5});
		this.sgFile = new saiGrid(this.pc1.childPage[1],{bound:[515,250,470,155],colCount:2,tag:5,
		             colTitle:["Dokumen","File"],colWidth:[[1,0],[80,320]],readOnly:true,autoAppend:false,defaultRow:1});				
		
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
						
			this.e_memo2.setReadOnly(true);			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_tiket_fTiketFinal.extend(window.childForm);
window.app_saku2_transaksi_kopeg_tiket_fTiketFinal.implement({	
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sai_tiketclose_m","no_close",this.app._lokasi+"-CLT.","00000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();															
					sql.add("insert into sai_tiketclose_m(no_close,kode_lokasi,periode,tanggal,tgl_input,nik_user) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"',getdate(),getdate(),'"+this.app._userLog+"')");					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "REMARK"){
							sql.add("update sai_tiket_m set no_close='"+this.e_nb.getText()+"',mandays="+line.md+" where no_tiket='"+line.no_tiket+"' and kode_lokasi='"+this.app._lokasi+"'");														
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
					
				break;
			case "simpan" :																												
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
		this.doLoad();
	},					
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(2,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);																		
				this.e_nb2.setText(this.sg.cells(2,row));
				this.e_judul2.setText(this.sg.cells(5,row));
				this.e_tgl.setText(this.sg.cells(4,row));				
				
				var data = this.dbLib.getDataProvider("select no_urut,convert(varchar,tanggal,103) as tanggal,substring(keterangan,1,100) as keterangan,nik_user from sai_tiket_d where no_tiket='"+this.e_nb2.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by no_urut desc",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg2.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg2.appendData([line.no_urut,line.tanggal,line.keterangan,line.nik_user]);
					}
				} else this.sg2.clear(1);									
				this.doDoubleClick2(this.sg2,0,0);
			}
		} catch(e) {alert(e);}
	},
	doDoubleClick2: function(sender, col , row) {
		try{
			if (this.sg2.cells(0,row) != "") {			
				//this.e_memo2.setText(this.sg2.cells(2,row));								
				var data = this.dbLib.getDataProvider("select keterangan from sai_tiket_d where no_tiket='"+this.e_nb2.getText()+"' and no_urut="+this.sg2.cells(0,row),true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line = data.rs.rows[0];							
					this.e_memo2.setText(line.keterangan);								
				}
				this.sgFile.clear();								
				var data = this.dbLib.getDataProvider("select a.no_gambar from sai_tiket_dok a where a.no_urut="+this.sg2.cells(0,row)+" and a.no_tiket = '"+this.e_nb2.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sgFile.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sgFile.appendData([line.no_gambar, "X"]);
					}
				} else this.sgFile.clear(1);										
			}
		} catch(e) {alert(e);}
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);
		}
		if (col == 1) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].md = nilaiToFloat(this.sg.cells(1,row));
			if (this.sg.cells(1,row)!="0") {
				this.sg.cells(0,row,"REMARK");
				this.dataJU.rs.rows[((this.page-1)*20) + row].status = "REMARK";
			}
		}
	},
	doLoad:function(sender){						
		var filterAwal = " ";
		var strSQL = "select 'INPROG' as status,0 as md,a.no_tiket,a.progress,convert(varchar,a.tanggal,103) as tgl,a.tanggal,a.judul,a.nik_user+' - '+b.nama as nama,datediff(day,a.tanggal,getdate())+1 as umur "+
		             "from sai_tiket_m a inner join hakakses b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi "+
					 "where a.no_close='-' and a.progress = 'CLOSE' and a.kode_lokasi='"+this.app._lokasi+"' "+filterAwal +" order by a.no_tiket desc";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},	
	doCari:function(sender){						
		var filterAwal = " ";
		var filter = "";
		if (this.e_nobukti.getText()!="") {
			filter = " and a.no_tiket='"+this.e_nobukti.getText()+"' ";			
		}
		else {			
			if (this.c_status3.getText()=="CLOSE") filter = " and a.progress = 'CLOSE' ";
		}
		var strSQL = "select 'INPROG' as status,0 as md,a.no_tiket,a.progress,convert(varchar,a.tanggal,103) as tgl,a.tanggal,a.judul,a.nik_user+' - '+b.nama as nama,datediff(day,a.tanggal,getdate())+1 as umur "+
		             "from sai_tiket_m a inner join hakakses b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi "+					 		             
					 "where a.no_close='-' and a.kode_lokasi='"+this.app._lokasi+"' "+filter +" order by a.no_tiket desc";
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
			this.sg.appendData([line.status.toUpperCase(),line.md,line.no_tiket,line.progress,line.tgl,line.judul,line.nama,line.umur]); 
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
							var nb = this.e_nb.getText();
							this.nama_report="server_report_saku2_kopeg_tiket_..........";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_tiket="+nb+"' ";
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
			this.standarLib.clearByTag(this, new Array("0","1","5"),this.e_nb);						
			this.sg.clear(1); this.sg2.clear(1); this.sgFile.clear(1); 			
			this.doLoad();								
			this.pc1.setActivePage(this.pc1.childPage[0]);							
			this.e_memo2.setText("");			
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});