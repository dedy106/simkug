window.app_mina_fViewAgg = function(owner)
{
	if (owner)
	{
		window.app_mina_fViewAgg.prototype.parent.constructor.call(this,owner);
		this.className  = "app_mina_fViewAgg";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form View Data Anggota", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");		
		this.bTampil = new button(this,{bound:[840,22,80,18],caption:"Tampil Data",click:[this,"doTampil"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,447], childPage:["Data Anggota","Detail Transaksi"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:0,
		            colTitle:["Kode","Nama Anggota","No ID","Alamat","Dana Motor","Dana Religi","Dana Anggota","Dana THT","Dana Pengajak"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,100,100,100,100, 200,100,100,80]],
					colFormat:[[4,5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					readOnly:true,dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});					
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:8,tag:9,
		            colTitle:["No Bukti","No Dokumen","Tanggal","Dari Kode Agg","Nama Anggota","Kode Param","Nama Param","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[80,150,80,200,80,70,100,100]],
					colFormat:[[7],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg2});	
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_mina_fViewAgg.extend(window.childForm);
window.app_mina_fViewAgg.implement({
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
					this.cb_bukti.setText("","");
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
				break;
			
		}
	},	
	doTampil: function(sender) {
		var strSQL ="select a.kode_agg,a.nama as nama_agg,a.no_id,a.alamat, "+
					"isnull(b.p01,0) as dana_motor, "+
					"isnull(c.p02,0) as dana_religi, "+
					"isnull(d.p03,0) as dana_anggota, "+
					"isnull(e.p04,0) as dana_tht, "+
					"isnull(f.p05,0) as dana_pengajak "+
					"from mina_agg a "+
					"left join ( "+
					"	select kode_agg,sum(nilai) as p01 "+
					"	from mina_titip_d where kode_param='P01' "+
					"	group by kode_agg,kode_param "+
					"	) b on a.kode_agg=b.kode_agg "+
					"left join ( "+
					"	select kode_agg,sum(nilai) as p02 "+
					"	from mina_titip_d where kode_param='P02' "+
					"	group by kode_agg,kode_param "+
					"	) c on a.kode_agg=c.kode_agg "+
					"left join ( "+
					"	select kode_agg,sum(nilai) as p03 "+
					"	from mina_titip_d where kode_param='P03' "+
					"	group by kode_agg,kode_param "+
					"	) d on a.kode_agg=d.kode_agg "+
					"left join ( "+
					"	select kode_agg,sum(nilai) as p04 "+
					"	from mina_titip_d where kode_param='P04' "+
					"	group by kode_agg,kode_param "+
					"	) e on a.kode_agg=e.kode_agg "+
					"left join ( "+
					"	select kode_agg,sum(nilai) as p05 "+
					"	from mina_titip_d where kode_param='P05' "+
					"	group by kode_agg,kode_param "+
					"	) f on a.kode_agg=f.kode_agg "+
					"where a.kode_agg <> '1100.00000'";

		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
	},	
	doTampilData: function(page) {
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.kode_agg,line.nama_agg,line.no_id,line.alamat,floatToNilai(line.dana_motor),floatToNilai(line.dana_religi),floatToNilai(line.dana_anggota),floatToNilai(line.dana_tht),floatToNilai(line.dana_pengajak)]);
		}
		this.sg.setNoUrut(start);
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(1,row) != "" && this.sg.cells(5,row) != "") {
			var strSQL = "select a.no_titip,b.no_dok,convert(varchar,b.tanggal,103) as tgl,b.kode_agg,c.nama as nama_agg,a.kode_param,d.nama as nama_param,a.nilai "+
						 "from mina_titip_d a "+
						 "     inner join mina_titip_m b on a.no_titip=b.no_titip  "+
						 "     inner join mina_agg c on b.kode_agg=c.kode_agg "+
						 "     inner join mina_param d on a.kode_param=d.kode_param "+
						 "where a.kode_agg = '"+this.sg.cells(0,row)+"' order by a.kode_param";			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.no_titip,line.no_dok,line.tgl,line.kode_agg,line.nama_agg,line.kode_param,line.nama_param,floatToNilai(line.nilai)]);
				}
			} else this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
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
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
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