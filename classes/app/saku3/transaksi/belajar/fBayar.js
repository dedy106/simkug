window.app_saku3_transaksi_belajar_fBayar = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_belajar_fBayar.prototype.parent.constructor.call(this,owner);
		this.maximize();		
		
		this.className  = "app_saku3_transaksi_belajar_fBayar";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pembayaran", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		
		this.pc1 = new pageControl(this,{bound:[20,20,1000,450], childPage:["Daftar Pembayaran","Data Pembayaran","Filter Cari"]});//,"Filter Cari"
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:5,tag:9, 
		            colTitle:["No Pembayaran","Tanggal","NIM","Keterangan","Periode"],
					colWidth:[[4,3,2,1,0],[80,400,100,80,100]],					
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		
        this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"No Pembayaran",maxLength:20,change:[this,"doChange"],readOnly:true});
        this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});	
        this.cb_nim = new saiCBBL(this.pc1.childPage[1],{bound:[20,11,220,20],caption:"NIM", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
        this.e_periode = new portalui_saiLabelEdit(this,{bound:[150,12,220,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.e_tgl = new portalui_label(this.pc1.childPage[1],{bound:[20,12,100,20],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,12,98,18],selectDate:[this,"doSelectDate"]}); 		
        this.e_ket = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Keterangan",maxLength:200,tag:9,change:[this,"doChange"]});
        
        this.e_nb2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,300,20],caption:"No Pembayaran",maxLength:20,tag:2});
        this.cb_nim2 = new saiCBBL(this.pc1.childPage[2],{bound:[20,11,220,20],caption:"NIM", multiSelection:false, maxLength:10, tag:9});
        this.bLoad = new button(this.pc1.childPage[2],{bound:[120,12,80,18],caption:"Cari Data",click:[this,"doCari"]});	
		
		
		this.pc2 = new pageControl(this.pc1.childPage[1],{bound:[1,30,this.pc1.width-4,this.pc1.height-125], childPage:["Data Tagihan"]});
		this.sg2 = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:4,tag:0,
		            colTitle:["No Tagihan","Keterangan","Nilai Tagihan","Nilai Bayar"],
                    colWidth:[[3,2,1,0],[100,100,200,100]],
                    // readOnly:true,
					columnReadOnly:[true,[0,1,2],[3]],
					// buttonStyle:[[0],[bsEllips]],
					colFormat:[[2,3],[cfNilai,cfNilai]],					
					autoAppend:true,defaultRow:1,
					});		
		this.sgn2 = new portalui_sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:2,grid:this.sg2});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		this.pc1.childPage[2].rearrangeChild(10, 23);		
		setTipeButton(tbAllFalse);
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
            this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
            		
			this.cb_nim.setSQL("select nim,nama from dev_siswa ",["nim","nama"],false,["Nim","Nama"],"where","Data Siswa",true);
			this.cb_nim2.setSQL("select nim,nama from dev_siswa ",["nim","nama"],false,["Nim","Nama"],"where","Data Siswa",true);			
			this.doLoad();
			
			// var sql = new server_util_arrayList();
			// sql.add("select kode_jenis,nama from dev_jenis where kode_lokasi='"+this.app._lokasi+"'");						
			// this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_belajar_fBayar.extend(window.childForm);
window.app_saku3_transaksi_belajar_fBayar.implement({
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
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into dev_bayar_m(no_bayar, tanggal, nim, keterangan,kode_lokasi,periode) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_nim.getText()+"','"+this.e_ket.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"')");
					
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)) { 
							sql.add("insert into dev_bayar_d(no_bayar,no_tagihan,nilai,kode_lokasi) values ('"+this.e_nb.getText()+"','"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(3,i))+",'"+this.app._lokasi+"')");
						
						}
					}							
					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from dev_bayar_m where no_bayar = '"+this.e_nb.getText()+"'");
					sql.add("delete from dev_bayar_d where no_bayar = '"+this.e_nb.getText()+"'");
					sql.add("insert into dev_bayar_m(no_bayar, tanggal, nim, keterangan,kode_lokasi,periode) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.cb_nim.getText()+"','"+this.e_ket.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"')");
					
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (this.sg2.rowValid(i)) { 
							sql.add("insert into dev_bayar_d (no_bayar,no_tagihan,nilai,kode_lokasi) values ('"+this.e_nb.getText()+"','"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(3,i))+",'"+this.app._lokasi+"')");
					
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from dev_bayar_m where no_bayar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from dev_bayar_d where no_bayar = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1","9"),this.e_nb);
					setTipeButton(tbAllFalse);
					this.doLoad();
				}
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
    },
    doSelectDate: function(sender, y,m,d){
        if (m < 10) m = "0" + m;	
        var periode='201812';		
		if (parseFloat(periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(periode);					
		}			
		if (this.stsSimpan == 1) this.doClick();					
    },
    doClick:function(sender){
        if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"dev_bayar_m","no_bayar",this.app._lokasi+"-PBR"+this.e_periode.getText().substr(2,4)+".","000"));
			// this.e_ket.setFocus();
		}
    },
	doChange: function(sender){
		try{	
			if (sender == this.e_nb && this.e_nb.getText() != ""){
				var strSQL = "select no_bayar, tanggal, nim, keterangan,periode "+
				             "from dev_bayar_m where no_bayar ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ";						   				
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d1.setDateString(line.tanggal);
						this.cb_nim.setText(line.nim);
						this.e_ket.setText(line.keterangan);
                        var strSQL2 = "select c.no_tagihan,c.keterangan,a.nilai as nilai_t, "+
                        "b.nilai as nilai_b "+ 
                        "from dev_tagihan_m c inner join "+
                        "(select no_tagihan,sum(nilai) as nilai from dev_tagihan_d group by no_tagihan) a on c.no_tagihan=a.no_tagihan "+
                        "inner join "+ 
                        "(select no_bayar,no_tagihan,sum(nilai) as nilai from dev_bayar_d group by no_tagihan,no_bayar) b on a.no_tagihan=b.no_tagihan and c.no_tagihan=b.no_tagihan "+
						"where b.no_bayar ='"+this.e_nb.getText()+"' ";

						var data2 = this.dbLib.getDataProvider(strSQL2,true);
						if (typeof data2 == "object" && data2.rs.rows[0] != undefined){
							var line2;
							this.sg2.clear();
							for (var i in data2.rs.rows){
								line2 = data2.rs.rows[i];							
								this.sg2.appendData([line2.no_tagihan,line2.keterangan,floatToNilai(line2.nilai_t),floatToNilai(line2.nilai_b)]);
							}
						} else this.sg2.clear(1);
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}else if (sender == this.cb_nim && this.cb_nim.getText() != ""){
				if(this.stsSimpan == 1) {
					
					var strSQL = "select a.nim,a.no_tagihan,a.keterangan,isnull(b.tagihan,0) as tagihan,isnull(c.bayar,0) as bayar,isnull(b.tagihan,0)-isnull(c.bayar,0) as sisa_tagihan "+
					"from dev_tagihan_m a "+
					"left join (select no_tagihan,kode_lokasi,sum(nilai) as tagihan "+
					"			from  dev_tagihan_d "+
					"			group by no_tagihan,kode_lokasi "+
					"		   ) b on a.no_tagihan=b.no_tagihan and a.kode_lokasi=b.kode_lokasi "+
					"left join (select no_tagihan,kode_lokasi,sum(nilai) as bayar "+
					"			from  dev_bayar_d "+
					"			group by no_tagihan,kode_lokasi "+
					"		   ) c on a.no_tagihan=c.no_tagihan and a.kode_lokasi=c.kode_lokasi "+
					"where a.nim='"+this.cb_nim.getText()+"'";					
					var data = this.dbLib.getDataProvider(strSQL,true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							var line;
							this.sg2.clear();
							for (var i in data.rs.rows){
									line = data.rs.rows[i];							
									this.sg2.appendData([line.no_tagihan,line.keterangan,floatToNilai(line.sisa_tagihan),floatToNilai(line.sisa_tagihan)]);
							}
						} else this.sg2.clear(1);
				}
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
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
	doCari:function(sender){								
		try {
            var filter='';
			if (this.e_nb2.getText() != "") {
				filter = " no_bayar like '%"+this.e_nb2.getText()+"%' ";
			}
			if (this.cb_nim2.getText() != "") {
				filter =" nim like '%"+this.cb_nim2.getText()+"%' ";
			}
			if (this.e_nb2.getText() != "" && this.cb_nim2.getText() != "") {
				filter = "no_bayar like '%"+this.e_nb2.getText()+"%' and nim like '%"+this.cb_nim2.getText()+"%'";
			}
			
			if(filter != ''){
				var strSQL = "select no_bayar,convert(varchar,tanggal,103) as tanggal,nim,keterangan,periode from dev_bayar_m "+	
						 "where "+filter;
			}else{
				var strSQL = "select no_bayar,convert(varchar,tanggal,103) as tanggal,nim,keterangan,periode from dev_bayar_m ";
			}
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		} 
		catch(e) {
			alert(e);
		}
	},
	doLoad:function(sender){								
		try {			
			var strSQL = "select no_bayar, convert(varchar,tanggal,103) as tanggal, nim, keterangan,periode from dev_bayar_m";	
			var data = this.dbLib.getDataProvider(strSQL,true);		
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} 
		catch(e) {
			alert(e);
		}
	},			
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];	
			this.sg1.appendData([line.no_bayar,line.tanggal,line.nim,line.keterangan,line.periode]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.stsSimpan = 0;
				this.e_nb.setText(this.sg1.cells(0,row));	
			}
		} catch(e) {alert(e);}
	}
});